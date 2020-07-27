from rest_framework.permissions import BasePermission


class IsRequesterOrAdminOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        return (not request.user.is_donor and obj.seeker == request.user.seeker_profile) or request.user.is_staff


class IsDonorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        return request.user.is_donor


class IsAdminOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        return request.user.is_staff
