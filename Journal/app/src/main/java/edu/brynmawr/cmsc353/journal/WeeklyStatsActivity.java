package edu.brynmawr.cmsc353.journal;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;

import com.anychart.AnyChart;
import com.anychart.AnyChartView;
import com.anychart.chart.common.dataentry.DataEntry;
import com.anychart.chart.common.dataentry.ValueDataEntry;
import com.anychart.charts.Cartesian;
import com.anychart.core.cartesian.series.Line;
import com.anychart.data.Mapping;
import com.anychart.data.Set;
import com.anychart.data.View;
import com.anychart.enums.Anchor;
import com.anychart.enums.MarkerType;
import com.anychart.enums.TooltipPositionMode;
import com.anychart.graphics.vector.Stroke;
//import com.anychart.sample.R;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


public class WeeklyStatsActivity extends AppCompatActivity {

    private String userID = null;
    private String TAG = "WeeklyStatsActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weekly_stats);

        if (Objects.isNull(this.userID)){
            this.userID = getIntent().getStringExtra("userID");
        }

        this.userID = "12345";

        LocalDate date = LocalDate.now().minusDays(7);

        URL url = null;

        try {
            url = new URL("http://10.0.2.2:3000/getDailies?userID=" + userID + "&date=" + date.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        Log.v("url", url.toString());

        URL[] urls = {url};

        AsyncTask<URL, String, String> getDailies = new AccessWebTask().execute(urls);

    }

    private class CustomDataEntry extends ValueDataEntry {

        CustomDataEntry(String x, Number energy, Number depression, Number anxiety, Number stress, Number motivation) {
            super(x, energy);
            setValue("depression", depression);
            setValue("anxiety", anxiety);
            setValue("stress", stress);
            setValue("motivation", motivation);
        }

    }

    protected void createGraph(JSONArray dailies){
        AnyChartView anyChartView = findViewById(R.id.lineGraphView);
        anyChartView.setProgressBar(findViewById(R.id.progress_bar));

        Cartesian cartesian = AnyChart.line();

        cartesian.animation(true);

        cartesian.padding(10d, 20d, 5d, 20d);

        cartesian.crosshair().enabled(true);
        cartesian.crosshair()
                .yLabel(true)
                // TODO ystroke
                .yStroke((Stroke) null, null, null, (String) null, (String) null);

        cartesian.tooltip().positionMode(TooltipPositionMode.POINT);

        cartesian.title("Trend of Sales of the Most Popular Products of ACME Corp.");

        cartesian.yAxis(0).title("Number of Bottles Sold (thousands)");
        cartesian.xAxis(0).labels().padding(5d, 5d, 5d, 5d);

        List<DataEntry> seriesData = new ArrayList<>();

        JSONObject prev = null;

        Log.v(TAG, String.valueOf(dailies.getClass()));
        Log.v(TAG, dailies.toString());
        for (int i = 0; i < dailies.length(); i++){
            Log.v(TAG, "Looping" + i);
            try {
                JSONObject curr = dailies.getJSONObject(i);
                if(prev == null) {
                    prev = curr;
                }
                String prevDate = String.valueOf(prev.get("date")).split("T")[0];

                String currDate = String.valueOf(curr.get("date")).split("T")[0];
                if(!prevDate.equals(currDate)){
                    Integer energy = null;
                    Integer depression = null;
                    Integer anxiety = null;
                    Integer stress = null;
                    Integer motivation = null;

                    JSONObject prevTrackers = prev.getJSONObject("trackers");

                    if (prevTrackers.has("energy")){
                        energy = prevTrackers.getInt("energy");
                    }
                    if (prevTrackers.has("depression")){
                        depression = prevTrackers.getInt("depression");
                    }
                    if (prevTrackers.has("anxiety")){
                        anxiety = prevTrackers.getInt("anxiety");
                    }
                    if (prevTrackers.has("stress")){
                        stress = prevTrackers.getInt("stress");
                    }
                    if (prevTrackers.has("motivation")){
                        motivation = prevTrackers.getInt("motivation");
                    }
                    seriesData.add(new CustomDataEntry(prevDate, energy, depression, anxiety, stress, motivation));
                    Log.v("date", prevDate + ", " + energy + ", " + depression + ", " + anxiety+ ", " + stress+ ", " + motivation);
                }

                prev = curr;

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }



        Set set = Set.instantiate();
        set.data(seriesData);
        Mapping series1Mapping = set.mapAs("{ x: 'x', value: 'energy' }");
        Mapping series2Mapping = set.mapAs("{ x: 'x', value: 'depression' }");
        Mapping series3Mapping = set.mapAs("{ x: 'x', value: 'anxiety' }");
        Mapping series4Mapping = set.mapAs("{ x: 'x', value: 'stress' }");
        Mapping series5Mapping = set.mapAs("{ x: 'x', value: 'motivation' }");


        Line series1 = cartesian.line(series1Mapping);
        series1.name("Energy");
        series1.hovered().markers().enabled(true);
        series1.hovered().markers()
                .type(MarkerType.CIRCLE)
                .size(4d);
        series1.tooltip()
                .position("right")
                .anchor(Anchor.LEFT_CENTER)
                .offsetX(5d)
                .offsetY(5d);

        Line series2 = cartesian.line(series2Mapping);
        series2.name("Depression");
        series2.hovered().markers().enabled(true);
        series2.hovered().markers()
                .type(MarkerType.CIRCLE)
                .size(4d);
        series2.tooltip()
                .position("right")
                .anchor(Anchor.LEFT_CENTER)
                .offsetX(5d)
                .offsetY(5d);

        Line series3 = cartesian.line(series3Mapping);
        series3.name("Anxiety");
        series3.hovered().markers().enabled(true);
        series3.hovered().markers()
                .type(MarkerType.CIRCLE)
                .size(4d);
        series3.tooltip()
                .position("right")
                .anchor(Anchor.LEFT_CENTER)
                .offsetX(5d)
                .offsetY(5d);

        Line series4 = cartesian.line(series4Mapping);
        series4.name("Stress");
        series4.hovered().markers().enabled(true);
        series4.hovered().markers()
                .type(MarkerType.CIRCLE)
                .size(4d);
        series4.tooltip()
                .position("right")
                .anchor(Anchor.LEFT_CENTER)
                .offsetX(5d)
                .offsetY(5d);

        Line series5 = cartesian.line(series5Mapping);
        series5.name("Motivation");
        series5.hovered().markers().enabled(true);
        series5.hovered().markers()
                .type(MarkerType.CIRCLE)
                .size(4d);
        series5.tooltip()
                .position("right")
                .anchor(Anchor.LEFT_CENTER)
                .offsetX(5d)
                .offsetY(5d);

        cartesian.legend().enabled(true);
        cartesian.legend().fontSize(13d);
        cartesian.legend().padding(0d, 0d, 10d, 0d);

        anyChartView.setChart(cartesian);

    }

    private class AccessWebTask extends AsyncTask<URL, String, String> {

        @Override
        protected String doInBackground(URL... urls) {
            try {
                URL url = urls[0];

                //represents the connection to the URL
                Log.v(TAG, url.toString());

                HttpURLConnection conn = (HttpURLConnection) url.openConnection();

                conn.setRequestMethod("GET");

                conn.connect();

                // now the response comes back
                int responsecode = conn.getResponseCode();

                // make sure the response has "200 OK" as the status
                if (responsecode != 200) {
                    String errorCode = "Problem writing to the Database: " + responsecode;
                    Log.v(TAG, errorCode);
                    return "FailureToConnectToServer";
                } else {
                    try (BufferedReader br = new BufferedReader(
                            new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                        StringBuilder response = new StringBuilder();
                        String responseLine = null;
                        while ((responseLine = br.readLine()) != null) {
                            response.append(responseLine.trim());
                        }
                        Log.v(TAG, response.toString());
                        conn.disconnect();
                        return response.toString();
                    }
                }
            } catch (java.net.ConnectException e) {
                e.printStackTrace();
                return "FailureToConnectToServer";
            } catch (Exception e) {
                e.printStackTrace();
                return e.toString();
            }

        }

        @Override
        protected void onPostExecute(String s) {
            Log.v(TAG, s);

            //Need to print appropriate error
            if (s.equals("FailureToConnectToServer")) {
                //WeeklyStatsActivity.this.showError("connection failure, please try again later");
                //WeeklyStatsActivity.this.clearAll();
            }
            try {
                JSONArray arr = new JSONArray(s);
                JSONObject obj = arr.getJSONObject(0);
                if (obj.has("error")) {
                    String error = String.valueOf(obj.get("error"));
                    if (error.equals("FailureToReturnDailies")) {

                        //LoginActivity.this.showError("failure to find user in database");
                    } else if (error.equals("EmailNotFound")) {
                        //LoginActivity.this.showError("email does not exist in the database");
                    } else {
                        //LoginActivity.this.showError("unspecified error");
                    }
                    //LoginActivity.this.clearAll();
                } else {
                    WeeklyStatsActivity.this.createGraph(arr);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }

    }
}