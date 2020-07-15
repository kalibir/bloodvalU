from rest_framework.permissions import BasePermission


class IsRequesterOrAdminOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        return obj.seeker == request.user.seeker_profile or request.user.is_staff
