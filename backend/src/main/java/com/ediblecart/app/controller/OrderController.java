package com.ediblecart.app.controller;

import com.ediblecart.app.entity.Order;
import com.ediblecart.app.repository.OrderRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderRepository orderRepository;
    private final ObjectMapper objectMapper;

    public OrderController(OrderRepository orderRepository, ObjectMapper objectMapper) {
        this.orderRepository = orderRepository;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/payments/checkout")
    public Map<String, Object> checkout(@RequestBody Map<String, Object> payload) {
        try {
            Order order = new Order();
            order.setCustomerName((String) payload.getOrDefault("customerName", "Customer"));
            order.setEmail((String) payload.getOrDefault("email", "customer@example.com"));
            order.setAddress((String) payload.getOrDefault("address", ""));
            order.setCity((String) payload.getOrDefault("city", ""));
            order.setPostalCode((String) payload.getOrDefault("postalCode", ""));
            order.setPaymentMethod((String) payload.getOrDefault("paymentMethod", "Card"));
            order.setTotal(Double.valueOf(payload.getOrDefault("total", 0.0).toString()));
            order.setItems(objectMapper.writeValueAsString(payload.getOrDefault("items", "[]")));
            order.setStatus("PAID");

            orderRepository.save(order);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("reference", "EDC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            response.put("message", "Payment processed successfully.");
            return response;
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to process payment", exception);
        }
    }
}
