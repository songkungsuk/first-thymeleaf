package com.game.team5.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.game.team5.mapper.UserInfoMapper;
import com.game.team5.vo.UserInfoVO;

@Service
public class UserInfoService {
    
    @Autowired
    private UserInfoMapper uiMapper;

    public List<UserInfoVO> getUserInfos(UserInfoVO user){
        return uiMapper.selectUserInfos(user);
    }

    public UserInfoVO login(UserInfoVO user){
        return uiMapper.selectUserInfoByIdAndPwd(user);
    }

    public UserInfoVO getUser(int uiNum){
        return uiMapper.selectUserInfo(uiNum);
    }

    public int insertUser(UserInfoVO user){
        return uiMapper.insertUserInfo(user);
    }

    public int updateUserInfo(UserInfoVO user){
        return uiMapper.updateUserInfo(user);
    }

    public int deleteUserInfo(int uiNum){
        return uiMapper.deleteUserInfo(uiNum);
    }
}
