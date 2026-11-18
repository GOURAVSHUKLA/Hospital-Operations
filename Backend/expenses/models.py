from django.db import models


class Expense(models.Model):

    CATEGORY_CHOICES = [
        ('ELECTRICITY', 'Electricity'),
        ('MEDICAL_EQUIPMENT', 'Medical Equipment'),
        ('MEDICINES', 'Medicines'),
        ('MAINTENANCE', 'Maintenance'),
        ('STAFF_SALARIES', 'Staff Salaries'),
        ('OTHER', 'Other Expenses'),
    ]

    PAYMENT_METHOD_CHOICES = [
        ('CASH', 'Cash'),
        ('UPI', 'UPI'),
        ('BANK_TRANSFER', 'Bank Transfer'),
        ('CARD', 'Card'),
    ]

    expense_title = models.CharField(max_length=200)

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    expense_date = models.DateField()

    payment_method = models.CharField(
        max_length=50,
        choices=PAYMENT_METHOD_CHOICES
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.expense_title