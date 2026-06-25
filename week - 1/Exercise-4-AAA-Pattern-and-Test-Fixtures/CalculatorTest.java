package com.example;

import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class CalculatorTest {

    private Calculator calculator;
    @Before
    public void setUp() {
        calculator = new Calculator(); 
        System.out.println("Setup: created a new Calculator");
    }
    @After
    public void tearDown() {
        calculator = null;              
        System.out.println("Teardown: cleaned up the Calculator");
    }

    @Test
    public void testAdd() {
        int a = 10;
        int b = 5;
        int result = calculator.add(a, b);
        assertEquals(15, result);
    }

    @Test
    public void testSubtract() {
        int a = 10;
        int b = 5;
        int result = calculator.subtract(a, b);
        assertEquals(5, result);
    }
}
