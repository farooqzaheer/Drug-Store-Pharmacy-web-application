from rest_framework import serializers
from .models import DragCategory, Drag, Doctor, DoctorDrag, DoctorPayment

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DragCategory
        fields = '__all__'

class DragSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Drag
        fields = ['id', 'name', 'category', 'category_name', 'quantity', 'price']

    def get_category_name(self, obj):
        return obj.category.name


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class DoctorDragSerializer(serializers.ModelSerializer):
    doctor_name = serializers.SerializerMethodField()
    drag_name = serializers.SerializerMethodField()
    drag_price = serializers.SerializerMethodField()
    doctor_discount = serializers.SerializerMethodField()

    class Meta:
        model = DoctorDrag
        fields = ['id', 'doctor', 'doctor_name', 'drag','drag_name', 'drag_price','doctor_discount','quantity', 'original_total_price','discounted_total_price']

    def get_doctor_name(self, obj):
        return obj.doctor.name
    
    def get_drag_name(self, obj):
        return obj.drag.name
    
    def get_drag_price(self, obj):
        return obj.drag.price
    
    def get_doctor_discount(self, obj):
        return obj.doctor.discount_percentage
    

    
class DoctorPaymentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.SerializerMethodField()
    class Meta:
        model = DoctorPayment
        fields = ['id','doctor', 'doctor_name', 'amount','payment_date']

    def get_doctor_name(self, obj):
        return obj.doctor.name
