package com.game.team5.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.game.team5.vo.TestVO;

@Controller
public class TestController {


    @GetMapping("/test")
    public void goTest(Model m) {
        m.addAttribute("name", "test");
        m.addAttribute("age", "30");
    }

    @GetMapping("/list")
    public void printList(Model m) {
        List<String> list = new ArrayList<>();
        list.add("아무거나");
        list.add("아무거가");
        list.add("아무거다");
        m.addAttribute("list", list);
    }

    @GetMapping("/list2")
    public void printList2(Model m) {
        
    }

    @GetMapping("/list3")
    public void printList3(Model m) {
        List<TestVO> list = new ArrayList<>();
        TestVO user = new TestVO();

        user.setNum(1);
        user.setName("홍길동");
        user.setAge(30);
        user.setAddr("서울");
        list.add(user);

        user = new TestVO(); // 2
        user.setNum(2);
        user.setName("임꺽정");
        user.setAge(44);
        user.setAddr("청주");
        list.add(user);

        user = new TestVO(); // 3
        user.setNum(3);
        user.setName("유관순");
        user.setAge(16);
        user.setAddr("서울");
        list.add(user);

        user = new TestVO(); // 4
        user.setNum(4);
        user.setName("이순신");
        user.setAge(50);
        user.setAddr("포항");
        list.add(user);

        m.addAttribute("list", list);
    }
}
