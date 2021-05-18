package be.cronos.admin.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
@ServerEndpoint("/admin")
public class AdminWebsocketEndpoint {

    private static final Logger LOG = LoggerFactory.getLogger(AdminWebsocketEndpoint.class);

    private final Map<String, Session> sessions = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, EndpointConfig config) {
        sessions.put(session.getId(), session);
        LOG.info("opened subscription {}", session.getId());
    }

    @OnClose
    public void onClose(Session session, CloseReason reason) {
        sessions.remove(session.getId());
        LOG.info("closed subscription {} reason {}", session.getId(), reason);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        LOG.error("error on subscription {} error {}", session.getId(), throwable.getMessage(), throwable);
    }

    @OnMessage
    public void onMessage(Session session, String message) {
        LOG.info("{} using {}", message, session.getId());
    }

    public void broadcastMessage(String message) {
        this.sessions.forEach((s, session) -> session.getAsyncRemote().sendText(message));
    }
}
