from django.contrib import admin
from .models import Expense


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'expense_title',
        'category',
        'amount',
        'expense_date',
        'payment_method',
        'created_at',
    )

    list_filter = (
        'category',
        'payment_method',
        'expense_date',
    )

    search_fields = (
        'expense_title',
        'description',
    )

    ordering = ('-expense_date',)