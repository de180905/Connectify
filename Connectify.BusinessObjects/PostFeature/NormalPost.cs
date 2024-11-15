using Connectify.BusinessObjects.Authen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connectify.BusinessObjects.PostFeature
{
    public class NormalPost : Post
    {
        public VisibilityLevel Visibility { get; set; }

    }

    public enum VisibilityLevel
    {
        Public,
        FriendsOnly,
        Private
    }
}
