using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<Profile>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }

            public class Handler : IRequestHandler<Query, Result<List<Profile>>>
            {
                private readonly DataContext _context;
                private readonly AutoMapper.IMapper _mapper;
                private readonly IUserAccessor _userAccessor;

                public Handler(
                    DataContext context,
                    AutoMapper.IMapper mapper,
                    IUserAccessor userAccessor
                )
                {
                    _mapper = mapper;
                    _context = context;
                    _userAccessor = userAccessor;
                }

                public async Task<Result<List<Profile>>> Handle(
                    Query request,
                    CancellationToken cancellationToken
                )
                {
                    var profiles = new List<Profile>();

                    switch (request.Predicate)
                    {
                        case "followers":
                            profiles = await _context.UserFollowings
                                .Where(x => x.Target.UserName == request.Username)
                                .Select(u => u.Observer)
                                .ProjectTo<Profiles.Profile>(
                                    _mapper.ConfigurationProvider,
                                    new { currentUsername = _userAccessor.GetUsername() }
                                )
                                .ToListAsync();
                            break;
                        case "following":
                            profiles = await _context.UserFollowings
                                .Where(x => x.Observer.UserName == request.Username)
                                .Select(u => u.Target)
                                .ProjectTo<Profiles.Profile>(
                                    _mapper.ConfigurationProvider,
                                    new { currentUsername = _userAccessor.GetUsername() }
                                )
                                .ToListAsync();
                            break;
                    }

                    return Result<List<Profile>>.Success(profiles);
                }
            }
        }
    }
}
