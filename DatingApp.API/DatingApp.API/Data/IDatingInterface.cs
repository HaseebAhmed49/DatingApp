using System;
namespace DatingApp.API.Data
{
    public interface IDatingInterface
    {
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveAll();

    }
}

