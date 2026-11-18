from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated

from .models import Expense
from .serializers import ExpenseSerializer

from accounts.permissions import IsAdminRole

from rest_framework.decorators import action
from rest_framework.response import Response

from django.db.models import Sum, Count
from django.db.models.functions import TruncMonth

class ExpenseViewSet(viewsets.ModelViewSet):

    serializer_class = ExpenseSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminRole
    ]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    search_fields = [
        'expense_title',
        'description'
    ]

    ordering_fields = [
        'expense_date',
        'amount',
        'created_at'
    ]

    ordering = ['-expense_date']

    def get_queryset(self):

        queryset = Expense.objects.all()

        category = self.request.query_params.get('category')
        payment_method = self.request.query_params.get('payment_method')
        expense_date = self.request.query_params.get('expense_date')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')

        if category:
            queryset = queryset.filter(category=category)

        if payment_method:
            queryset = queryset.filter(payment_method=payment_method)

        if expense_date:
            queryset = queryset.filter(expense_date=expense_date)

        if start_date:
            queryset = queryset.filter(expense_date__gte=start_date)

        if end_date:
            queryset = queryset.filter(expense_date__lte=end_date)

        return queryset

    @action(detail=False, methods=['get'], url_path='summary')
    def expense_summary(self, request): 
        # Total expense
        total_expense = Expense.objects.aggregate(
            total=Sum('amount')
        )['total'] or 0

        # Total expense records
        total_records = Expense.objects.count()

        # Category-wise expenses
        category_wise = Expense.objects.values(
            'category'
        ).annotate(
            total_amount=Sum('amount'),
            total_records=Count('id')
        ).order_by('category')

        # Monthly expenses
        monthly_expenses = Expense.objects.annotate(
            month=TruncMonth('expense_date')
        ).values(
            'month'
        ).annotate(
            total_amount=Sum('amount')
        ).order_by('month')

        return Response({
            'total_expense': total_expense,
            'total_records': total_records,
            'category_wise': category_wise,
            'monthly_expenses': monthly_expenses
        })