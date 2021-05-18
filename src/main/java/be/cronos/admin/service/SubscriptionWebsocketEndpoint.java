package be.cronos.admin.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
@RequiredArgsConstructor
@ServerEndpoint("/stations/{stationId}/subscriptions")
public class SubscriptionWebsocketEndpoint {

    private static final Logger LOG = LoggerFactory.getLogger(SubscriptionWebsocketEndpoint.class);
    private static final Object LOCK = new Object();

    private final AdminWebsocketEndpoint adminWebsocketEndpoint;
    private final ObjectMapper objectMapper;

    private final Map<String, Session> sessions = new ConcurrentHashMap<>();
    private final Map<String, StationStatistics> stations = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, EndpointConfig config, @PathParam("stationId") String stationId) {
        sessions.put(stationId, session);
        LOG.info("opened subscription {} for station {}", session.getId(), stationId);
    }

    @OnClose
    public void onClose(Session session, CloseReason reason, @PathParam("stationId") String stationId) {
        synchronized (LOCK) {
            sessions.remove(stationId);
            stations.remove(stationId);
            LOG.info("closed subscription {} for station {} reason {}", session.getId(), stationId, reason);
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable, @PathParam("stationId") String stationId) {
        LOG.error("error on subscription {} for station {} error {}", session.getId(), stationId, throwable.getMessage(), throwable);
    }

    @OnMessage
    @SneakyThrows
    public void onMessage(Session session, String message, @PathParam("stationId") String stationId) {
        synchronized (LOCK){
            LOG.debug("{} from station {} using {}", message, stationId, session.getId());
            StationStatistics statistics = objectMapper.readValue(message, StationStatistics.class);
            stations.put(statistics.getStation().getId(), statistics);
            String stationMapJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(stations.values());
            adminWebsocketEndpoint.broadcastMessage(stationMapJson);
        }
    }

    public void broadcastMessage(String message) {
        this.sessions.forEach((s, session) -> session.getAsyncRemote().sendText(message));
    }

    public void broadcastMessage(String stationId, String message) {
        Session session = this.sessions.get(stationId);
        if (session != null){
            LOG.info("broadcast session: {} station: {} message: {}", session.getId(), stationId, message);
            session.getAsyncRemote().sendText(message);
        }
    }
}
