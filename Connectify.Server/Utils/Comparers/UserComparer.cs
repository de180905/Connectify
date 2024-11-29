﻿using Connectify.BusinessObjects.Authen;

namespace Connectify.Server.Utils.Comparers
{
    public class UserComparer : IEqualityComparer<User>
    {
        public bool Equals(User x, User y)
        {
            return x?.Id == y?.Id;
        }

        public int GetHashCode(User obj)
        {
            return obj.Id.GetHashCode();
        }
    }

}