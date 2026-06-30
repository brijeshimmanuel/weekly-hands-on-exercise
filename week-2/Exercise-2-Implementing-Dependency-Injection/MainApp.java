package com.library;

import com.library.service.BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainApp {
    public static void main(String[] args) {

        // Load the Spring container from the XML file
        ApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");

        // Ask Spring for the bookService bean (Spring already built & wired it)
        BookService bookService = (BookService) context.getBean("bookService");

        // Use it
        bookService.displayBook();
    }
}
