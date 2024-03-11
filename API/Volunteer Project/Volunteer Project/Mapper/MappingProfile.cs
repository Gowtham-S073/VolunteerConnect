using AutoMapper;
using Volunteer_Project.Models;
using Volunteer_Project.RequestModel;
using Volunteer_Project.ViewModel;

namespace Volunteer_Project.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<RequestVolunterRegister, VolunteerDetail>().ReverseMap();
            CreateMap<RequestUserRequest, Request>().ReverseMap();
            CreateMap<RequestNewUser, User>().ReverseMap();
            CreateMap<RequestDisasterNeeds,DisasterNeed>().ReverseMap();
            CreateMap<RequestVolunteerMapping, VolunteerMapping>().ReverseMap();
            CreateMap<RequestRequestDetail, RequestDetail>().ReverseMap();
            CreateMap<ViewDisasterneeds, DisasterNeed>().ReverseMap();
            CreateMap<VolunteerDetail,ViewVolunteerRegisterDetails >().ReverseMap();
            CreateMap<Disaster, ViewDisasters>().ReverseMap();


        }
    }
}
