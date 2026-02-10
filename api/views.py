from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework import generics
from .serializers import DoctorDragSerializer
from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import DragCategory, Drag, Doctor, DoctorDrag, DoctorPayment
from .serializers import CategorySerializer, DragSerializer, DoctorSerializer, DoctorDragSerializer, DoctorPaymentSerializer

class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = DragCategory.objects.all()
    serializer_class = CategorySerializer

class DragsViewSet(viewsets.ViewSet):
    def list(self, request):
        drags = Drag.objects.all()
        serializer = DragSerializer(drags, many=True)
        drag_data_list = []

        for drag_data in serializer.data:
            drag_id = drag_data['id']
            total_bought = DoctorDrag.objects.filter(drag_id=drag_id).aggregate(total_bought=Sum('quantity'))['total_bought']
            total_bought = total_bought or 0  # handle None case
            remaining_quantity = drags.get(id=drag_id).quantity - total_bought
            drag_data['total_bought'] = total_bought
            drag_data['remaining_quantity'] = remaining_quantity
            drag_data_list.append(drag_data)

        return Response(drag_data_list)

    def create(self, request):
        serializer = DragSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DoctorsViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    
    
class DoctorDragViewSet(viewsets.ModelViewSet):
    queryset = DoctorDrag.objects.all() 
    serializer_class = DoctorDragSerializer

    
class DoctorPaymentViewSet(viewsets.ModelViewSet):
    queryset = DoctorPayment.objects.all() 
    serializer_class = DoctorPaymentSerializer
    
