from django.db import models

class DragCategory(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Drag(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(DragCategory, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Doctor(models.Model):
    name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    total_money_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    total_money_unpaid = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def __str__(self):
        return self.name

class DoctorDrag(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    drag = models.ForeignKey(Drag, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    original_total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    discounted_total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def save(self, *args, **kwargs):
        base_price = self.drag.price * self.quantity
        discount = (self.doctor.discount_percentage / 100) * base_price
        self.original_total_price = base_price
        self.discounted_total_price = base_price - discount

        super().save(*args, **kwargs)

        # Update total money unpaid for the doctor with discounted price
        self.doctor.total_money_unpaid += self.discounted_total_price
        self.doctor.save()

    def __str__(self):
        return f"{self.doctor.name} - {self.drag.name}"

class DoctorPayment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.pk is None:  # New instance
            self.doctor.total_money_paid += self.amount
            self.doctor.total_money_unpaid -= self.amount
        else:  # Updating existing instance
            old_payment = DoctorPayment.objects.get(pk=self.pk)
            amount_diff = self.amount - old_payment.amount
            self.doctor.total_money_paid += amount_diff
            self.doctor.total_money_unpaid -= amount_diff

        self.doctor.save()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.doctor.total_money_paid -= self.amount
        self.doctor.total_money_unpaid += self.amount
        self.doctor.save()
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"{self.doctor.name} - {self.amount} on {self.payment_date}"

class DailySpend(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    spend_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.amount} on {self.spend_date}"
