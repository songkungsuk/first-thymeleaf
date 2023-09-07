package com.game.team5;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan
public class Team5Application {

	public static void main(String[] args) {
		SpringApplication.run(Team5Application.class, args);
	}

}
