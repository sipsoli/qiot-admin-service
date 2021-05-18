package be.cronos.admin.service;

import javax.ws.rs.*;

@Path("admin")
@Consumes("application/json")
@Produces("application/json")
public class AdminResource {

    private final AdminSensorService adminSensorService;

    public AdminResource(AdminSensorService adminSensorService) {
        this.adminSensorService = adminSensorService;
    }

    @POST
    @Path("/gas/pause")
    public void pauseAllGasCollectors() {
        adminSensorService.pauseAllGasCollectors();
    }

    @POST
    @Path("gas/pause/{stationId}")
    public void pauseGasCollectors(@PathParam("stationId") String stationId) {
        adminSensorService.pauseGasCollector(stationId);
    }

    @POST
    @Path("gas/resume")
    public void resumeAllGasCollectors() {
        adminSensorService.resumeAllGasCollectors();
    }

    @POST
    @Path("gas/resume/{stationId}")
    public void resumeGasCollectors(@PathParam("stationId") String stationId) {
        adminSensorService.resumeGasCollector(stationId);
    }

    @POST
    @Path("gas/change")
    public void updateIntervalAllGasCollectors(@QueryParam("interval") int interval) {
        adminSensorService.updateIntervalAllGasCollectors(interval);
    }

    @POST
    @Path("gas/change/{stationId}")
    public void updateIntervalGasCollectors(@PathParam("stationId") String stationId, @QueryParam("interval") int interval) {
        adminSensorService.updateIntervalGasCollector(stationId, interval);
    }

    @POST
    @Path("pollution/pause")
    public void pauseAllPollutionCollectors() {
        adminSensorService.pauseAllPollutionCollectors();
    }

    @POST
    @Path("pollution/pause/{stationId}")
    public void pausePollutionCollectors(@PathParam("stationId") String stationId) {
        adminSensorService.pausePollutionCollector(stationId);
    }

    @POST
    @Path("pollution/resume")
    public void resumeAllPollutionCollectors() {
        adminSensorService.resumeAllPollutionCollectors();
    }

    @POST
    @Path("pollution/resume/{stationId}")
    public void resumePollutionCollectors(@PathParam("stationId") String stationId) {
        adminSensorService.resumePollutionCollector(stationId);
    }

    @POST
    @Path("pollution/change")
    public void updateIntervalAllPollutionCollectors(@QueryParam("interval") int interval) {
        adminSensorService.updateIntervalAllPollutionCollectors(interval);
    }

    @POST
    @Path("pollution/change/{stationId}")
    public void updateIntervalPollutionCollectors(@PathParam("stationId") String stationId, @QueryParam("interval") int interval) {
        adminSensorService.updateIntervalPollutionCollector(stationId, interval);
    }
}
