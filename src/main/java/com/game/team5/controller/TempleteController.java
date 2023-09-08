package com.game.team5.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TempleteController {
    @GetMapping("/")
    public String index(){
        return "index2";
    }


    @GetMapping("/tmpl/**")
    public void goPage(){

    }
}
