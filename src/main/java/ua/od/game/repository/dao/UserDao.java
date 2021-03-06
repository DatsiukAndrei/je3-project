package ua.od.game.repository.dao;

import ua.od.game.model.UserEntity;

/**
 * @author ruslan.gramatic
 */
public interface UserDao {
    String loginUser(UserEntity user);
    boolean logoutUser(String token);
    String createNewUser(UserEntity user);
    UserEntity getUserByToken(String token);
}
