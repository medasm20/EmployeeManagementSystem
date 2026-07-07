package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User saveUser(User user);

    User getUserById(Long id);

    User getUserByUsername(String username);

    User updateUser(Long id, User user);

    void deleteUser(Long id);
}