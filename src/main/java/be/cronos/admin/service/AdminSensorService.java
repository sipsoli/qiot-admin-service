package be.cronos.admin.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AdminSensorService {

    private static final String PAUSE_GAS_COLLECTOR = "pauseGasCollector";
    private static final String RESUME_GAS_COLLECTOR = "resumeGasCollector";
    private static final String CHANGE_INTERVAL_GAS_COLLECTOR = "changeIntervalGasCollector";

    private static final String PAUSE_POLLUTION_COLLECTOR = "pausePollutionCollector";
    private static final String RESUME_POLLUTION_COLLECTOR = "resumePollutionCollector";
    private static final String CHANGE_INTERVAL_POLLUTION_COLLECTOR = "changeIntervalPollutionCollector";

    private final SubscriptionWebsocketEndpoint endpoint;
    private final ObjectMapper objectMapper;

    public AdminSensorService(SubscriptionWebsocketEndpoint endpoint, ObjectMapper objectMapper) {
        this.endpoint = endpoint;
        this.objectMapper = objectMapper;
    }

    @SneakyThrows
    public void pauseAllGasCollectors() {
        Event event = new Event(PAUSE_GAS_COLLECTOR);
        String eventJson = objectMapper.writeValueAsString(event);
        endpoint.broadcastMessage(eventJson);
    }

    @SneakyThrows
    public void pauseGasCollector(String stationId) {
        Event event = new Event(PAUSE_GAS_COLLECTOR);
        String eventJson = objectMapper.writeValueAsString(event);
        endpoint.broadcastMessage(stationId, eventJson);
    }

    @SneakyThrows
    public void resumeAllGasCollectors() {
        Event event = new Event(RESUME_GAS_COLLECTOR);
        endpoint.broadcastMessage(objectMapper.writeValueAsString(event));
    }

    @SneakyThrows
    public void resumeGasCollector(String stationId) {
        Event event = new Event(RESUME_GAS_COLLECTOR);
        String eventJson = objectMapper.writeValueAsString(event);
        endpoint.broadcastMessage(stationId, eventJson);
    }

    @SneakyThrows
    public void updateIntervalAllGasCollectors(int interval) {
        Event event = new Event(CHANGE_INTERVAL_GAS_COLLECTOR, "{\"interval\":" + interval + "}");
        endpoint.broadcastMessage(objectMapper.writeValueAsString(event));
    }

    @SneakyThrows
    public void updateIntervalGasCollector(String stationId, int interval) {
        Event event = new Event(CHANGE_INTERVAL_GAS_COLLECTOR, "{\"interval\":" + interval + "}");
        String eventJson = objectMapper.writeValueAsString(event);
        endpoint.broadcastMessage(stationId, eventJson);
    }

    @SneakyThrows
    public void pauseAllPollutionCollectors() {
        Event event = new Event(PAUSE_POLLUTION_COLLECTOR);
        endpoint.broadcastMessage(objectMapper.writeValueAsString(event));
    }

    @SneakyThrows
    public void pausePollutionCollector(String stationId) {
        Event event = new Event(PAUSE_POLLUTION_COLLECTOR);
        String eventJson = objectMapper.writeValueAsString(event);
        endpoint.broadcastMessage(stationId, eventJson);
    }

    @SneakyThrows
    public void resumeAllPollutionCollectors() {
        Event event = new Event(RESUME_POLLUTION_COLLECTOR);
        endpoint.broadcastMessage(objectMapper.writeValueAsString(event));
    }

    @SneakyThrows
    public void resumePollutionCollector(String stationId) {
        Event event = new Event(RESUME_POLLUTION_COLLECTOR);
        String eventJson = objectMapper.writeValueAsString(event);
        endpoint.broadcastMessage(stationId, eventJson);
    }

    @SneakyThrows
    public void updateIntervalAllPollutionCollectors(int interval) {
        Event event = new Event(CHANGE_INTERVAL_POLLUTION_COLLECTOR, "{\"interval\":" + interval + "}");
        endpoint.broadcastMessage(objectMapper.writeValueAsString(event));
    }

    @SneakyThrows
    public void updateIntervalPollutionCollector(String stationId, int interval) {
        Event event = new Event(CHANGE_INTERVAL_POLLUTION_COLLECTOR, "{\"interval\":" + interval + "}");
        String eventJson = objectMapper.writeValueAsString(event);
        endpoint.broadcastMessage(stationId, eventJson);
    }

}
