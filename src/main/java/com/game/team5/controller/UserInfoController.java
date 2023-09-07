package com.game.team5.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.game.team5.service.UserInfoService;
import com.game.team5.vo.UserInfoVO;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class UserInfoController {

    @Autowired
    UserInfoService uiService;

    @GetMapping("/user-infos")
    public List<UserInfoVO> getUserInfos(UserInfoVO user) {
        return uiService.getUserInfos(user);
    }

    @PostMapping("/login")
    public String login(UserInfoVO user, Model m, HttpSession session) {
        log.info("user->{}", user);

        UserInfoVO check = uiService.login(user);
        if (check == null) {
            m.addAttribute("msg", "id또는 pw를 확인해주세요");
        } else {
            m.addAttribute("msg", "login성공");
            session.setAttribute("user", check);
            return "/index";
        }

        return "tmpl/user-info/login";
    }

    @GetMapping("/user-infos/{uiNum}")
    public UserInfoVO getUser(@PathVariable int uiNum) {
       return uiService.getUser(uiNum);
    }

    @PostMapping("/user-infos")
    public int insertUser(@RequestBody UserInfoVO user) {
        return uiService.insertUser(user);
    }

    @PutMapping("/user-infos")
    public int updateUser(@RequestBody UserInfoVO user) {
        return uiService.updateUserInfo(user);
    }

    @DeleteMapping("/user-infos/{uiNum}")
    public int deleteUser(@PathVariable int uiNum) {
        return uiService.deleteUserInfo(uiNum);
    }

}
