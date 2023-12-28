from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import AllowAny
import json
from rest_framework.response import Response
from .Auth import IsAuth, JWTAuthorization, IsAdmin
from .scrabing_pharmacy import Scrap
from django.db.models import F, Q
from django.db.models.functions import JSONObject
from django.contrib.postgres.aggregates import ArrayAgg, JSONBAgg


class Registration(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerialization

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save()
        except Exception as e:
            return Response(status=500, data={'error': f"Failed to register because {e}"})
        return Response(status=200)


# authentication
class Auntification(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = AuntificationSerialization

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = {**serializer.validated_data, **kwargs}
        try:
            token = serializer.createToken(validated_data)
        except Exception as e:
            return Response(status=500, data={'error': e})
        return Response(status=200, data={"token": f"Token {token}"})


class GetMedicine(generics.ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthorization]

    def get(self, request, *args, **kwargs):
        if request.GET.get('medicine_id'):
            med = Medicines.objects.filter(pk=request.GET['medicine_id']).annotate(
                comments=JSONBAgg(JSONObject(text='comment__text', user='comment__user_id__name'))).annotate(
                element=ArrayAgg('active_element__name', distinct=True)).values('pk', 'name',
                                                                                'category__name',
                                                                                'element',
                                                                                'producer',
                                                                                'total_amount',
                                                                                'release_form',
                                                                                'quantity', 'comments', 'image')
        else:
            med = Medicines.objects.all().annotate(
                element=ArrayAgg('active_element__name')).values('pk', 'name', 'category__name', 'element', 'producer',
                                                                 'total_amount', 'release_form', 'quantity', 'image')
        return Response(status=200, data={'med': med})


class TestScrap(generics.ListAPIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            Scrap.delay()
        except Exception as e:
            print(e)
            return Response(status=500)
        return Response(status=200)


class GetMedicineForActiveElement(generics.ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthorization]

    def get(self, request, *args, **kwargs):

        try:
            medicine = Medicines.objects.filter(active_element__name__in=request.GET.get('element')).annotate(
                element=ArrayAgg('active_element__name')).values('pk', 'name', 'category__name', 'element', 'producer',
                                                                 'total_amount', 'release_form', 'quantity', 'image')
        except Exception as e:
            print(e)
            Requests.objects.create(user=request.user.__str__(), search_type="Name", response_code=500, response_text=e)
            return Response(status=500)
        Requests.objects.create(user=request.user.__str__(), search_type="Name", response_code=200)
        return Response(status=200, data={'med': medicine})


class GetMedicineForName(generics.ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthorization]

    def get(self, request, *args, **kwargs):
        try:
            medicine = Medicines.objects.filter(name__icontains=request.GET.get('medicine_name')).annotate(
                element=ArrayAgg('active_element__name')).values('pk', 'name', 'category__name', 'element', 'producer',
                                                                 'total_amount', 'release_form', 'quantity', 'image')
        except Exception as e:
            print(e)
            Requests.objects.create(user=request.user.__str__(), search_type="Name", response_code=500, response_text=e)
            return Response(status=500)
        Requests.objects.create(user=request.user.__str__(), search_type="Name", response_code=200)
        return Response(status=200, data={'med': medicine})


class GetMedicineForCategory(generics.ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthorization]

    def get(self, request, *args, **kwargs):
        try:
            medicine = Medicines.objects.filter(category__name=request.GET.get('category_name')).annotate(
                element=ArrayAgg('active_element__name')).values('pk', 'name', 'category__name', 'element', 'producer',
                                                                 'total_amount', 'release_form', 'quantity', 'image')
        except Exception as e:
            print(e)
            Requests.objects.create(user=request.user.__str__(), search_type="Name", response_code=500, response_text=e)
            return Response(status=500)
        Requests.objects.create(user=request.user.__str__(), search_type="Name", response_code=200)
        return Response(status=200, data={'med': medicine})


class GetCategory(generics.ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthorization]

    def get(self, request, *args, **kwargs):
        try:
            category = Category.objects.all().values()
        except Exception as e:
            print(e)
            return Response(status=500)
        return Response(status=200, data={'category': category})


class GetActiveElement(generics.ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthorization]

    def get(self, request, *args, **kwargs):
        try:
            element = ActiveIngredients.objects.all().values()
        except Exception as e:
            print(e)
            return Response(status=500)
        return Response(status=200, data={'element': element})


class GetFavorites(generics.ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthorization]

    def get(self, request, *args, **kwargs):
        medic = Views.objects.filter(user_id_id=request.user.pk).values_list('medicine_id')
        views = Medicines.objects.filter(med_id__in=medic).annotate(
            element=ArrayAgg('active_element__name')).values('pk', 'name', 'category__name', 'element', 'producer',
                                                             'total_amount', 'release_form', 'quantity', 'image')
        return Response(status=200, data={'views': views})


class CreateViews(generics.CreateAPIView):
    permission_classes = [IsAuth]
    authentication_classes = [JWTAuthorization]

    def post(self, request, *args, **kwargs):
        Views.objects.create(user_id_id=request.user.pk, medicine_id=request.data.get('medicine_id'))
        return Response(status=200)


class CreateComment(generics.CreateAPIView):
    permission_classes = [IsAuth]
    authentication_classes = [JWTAuthorization]

    def post(self, request, *args, **kwargs):
        print(request.user)
        try:
            com = Comments.objects.create(user_id_id=request.user.pk, text=request.data.get('comment'))
            medic = Medicines.objects.get(pk=request.data.get('medicine_id'))
            medic.comment.add(com.pk)
        except Exception as e:
            print(e)
            return Response(status=500, data={'error': e})
        return Response(status=200)


class GetLogs(generics.ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthorization]

    def get(self, request, *args, **kwargs):
        log = Requests.objects.filter(
            Q(date__gte=request.GET.get('date_start')) & Q(date__lte=request.GET.get('date_finish'))).values()
        return Response(status=200, data={'log': log})


class DeleteComment(generics.DestroyAPIView):
    permission_classes = [IsAuth]
    authentication_classes = [JWTAuthorization]

    def delete(self, request, *args, **kwargs):
        try:
            coment = Comments.objects.get(pk=request.data.get('comment_id'), user_id=request.user)
            med = Medicines.objects.get(comment=coment)
            med.comment.remove(coment)
            coment.delete()
        except Exception as e:
            print(e)
            return Response(status=500)
        return Response(status=200)


class UpdateComment(generics.UpdateAPIView):
    permission_classes = [IsAuth]
    authentication_classes = [JWTAuthorization]

    def put(self, request, *args, **kwargs):
        try:
            coment = Comments.objects.get(pk=request.data.get('comment_id'), user_id=request.user)
            coment.text = request.data.get('comment_text')
            coment.save()
        except Exception as e:
            print(e)
            return Response(status=500)
        return Response(status=200)


class UpdateInfoUser(generics.UpdateAPIView):
    permission_classes = [IsAuth]
    authentication_classes = [JWTAuthorization]

    def put(self, request, *args, **kwargs):
        try:
            user = Users.objects.get(pk=request.user.pk)
            user.name = request.data.get('name')
            user.password = make_password(request.data.get('password'))
            user.date_of_birth = request.data.get('date_of_birth')
        except Exception as e:
            print(e)
            return Response(status=500)
        return Response(status=200)


class DeleteUser(generics.DestroyAPIView):
    permission_classes = [IsAdmin]
    authentication_classes = [JWTAuthorization]

    def delete(self, request, *args, **kwargs):
        try:
            user = Users.objects.get(pk=request.data.get('user_id'))
            coment = Comments.objects.filter(user_id=user)
            for i in coment:
                med = Medicines.objects.get(comment=i)
                med.comment.remove(i)
            coment.delete()
            user.delete()
        except Exception as e:
            print(e)
            return Response(status=500)
        return Response(status=200)


class GetMedicineForSymptoms(generics.ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthorization]

    def get(self, request, *args, **kwargs):
        try:
            category = Symptoms.objects.get(name=request.GET.get('symptoms_name'))
        except Exception as e:
            if request.GET.get('symptoms_name'):
                moderator = Users.objects.filter(role__name='moderator').values('pk')
                last_moderator = ChainQueue.objects.last().pk
                if len(moderator) > 1:
                    count = 0
                    for i in moderator:
                        if i['pk'] == last_moderator:
                            count += 1
                            if count > len(moderator):
                                count = 0
                            last_moderator = moderator[count].pk
                            break
                        count += 1
                ChainQueue.objects.create(symptoms=request.GET.get('symptoms_name'), moderator_id=last_moderator)
                return Response(status=501, data={
                    'error': 'Пока мы не знаем рецепта от вашей болезни, но в скоре наши врачи с этим справяться'})
            else:
                print(e)
                return Response(status=500)
        medicine = Medicines.objects.filter(category=category).annotate(
            element=ArrayAgg('active_element__name')).values('pk', 'name', 'category__name', 'element',
                                                             'producer',
                                                             'total_amount', 'release_form', 'quantity', 'image')
        return Response(status=200, data={'medicine': medicine})


class GetChainQueue(generics.ListAPIView):
    permission_classes = [IsAdmin]
    authentication_classes = [JWTAuthorization]

    def get(self, request, *args, **kwargs):
        chain = ChainQueue.objects.filter(moderator=request.user).values()
        return Response(status=200, data={'chain': chain})


class SetChain(generics.CreateAPIView):
    permission_classes = [IsAdmin]
    authentication_classes = [JWTAuthorization]

    def post(self, request, *args, **kwargs):
        symptoms = []
        for i in request.data.get('chain'):
            symptoms.append(Symptoms(symptoms=i['symptoms'], category_id=i['category']))
            chain = ChainQueue.objects.get(pk=i['id'])
            chain.delete()
        Symptoms.objects.bulk_create(symptoms)
        return Response(status=200)


class GetUserInfo(generics.ListAPIView):
    permission_classes = [IsAuth]
    authentication_classes = [JWTAuthorization]

    def get(self, request, *args, **kwargs):
        try:
            user = Users.objects.filter(pk=request.user.pk).values('pk', 'name', 'email', 'date_of_birth', 'role__name')[0]
        except Exception as e:
            print(e)
            return Response(status=500)
        return Response(status=200, data={'user': user})
