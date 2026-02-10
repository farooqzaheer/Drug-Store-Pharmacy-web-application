from django.contrib import admin
from .models import DragCategory, Drag, Doctor, DoctorDrag, DoctorPayment, DailySpend

admin.site.register(DragCategory)
admin.site.register(Drag)
admin.site.register(Doctor)
admin.site.register(DoctorDrag)
admin.site.register(DoctorPayment)
admin.site.register(DailySpend)
