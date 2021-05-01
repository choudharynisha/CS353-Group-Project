package edu.brynmawr.cmsc353.journal;

import androidx.appcompat.app.AppCompatActivity;

import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.content.Intent;
import android.widget.TextView;
import android.util.Log;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

import org.json.JSONException;
import org.json.JSONObject;

import java.time.LocalDateTime;

public class TrackMHActivity extends AppCompatActivity {

    private String userID = null;
    private String energy = null;
    private String depression = null;
    private String anxiety = null;
    private String stress = null;
    private String motivation = null;

    //https://developer.android.com/reference/android/util/Log
    private static final String TAG = "TrackMHActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_track_m_h);
        //https://java2blog.com/java-isnull/
        if (Objects.isNull(this.userID)){
            this.userID = getIntent().getStringExtra("userID");
        }
        //https://java2blog.com/java-isnull/
    }

    public void onclickSubmit(View view) {
        if (Objects.isNull(this.energy) && Objects.isNull(this.depression) &&
                Objects.isNull(this.anxiety) && Objects.isNull(this.stress) &&
                Objects.isNull(this.motivation)){
            Log.v(TAG, "All trackers are null, not sending anything to the Database");
        }
        else {
            try {
                //https://codechacha.com/en/android-cleartext-http-traffic-issue/
                //https://stackoverflow.com/questions/45940861/android-8-cleartext-http-traffic-not-permitted
                //https://stackoverflow.com/questions/36811202/java-net-connectexception-fail-to-connect-to-localhost-127-0-0-1port-8080-co
                URL url = new URL("http://10.0.2.2:3000/createDaily");

                JSONObject daily = makeDaily();

                Wrapper wrapper = new Wrapper(url, daily, "trackMH");
                //https://stackoverflow.com/questions/3075009/android-how-can-i-pass-parameters-to-asynctasks-onpreexecute
                Wrapper[] wrappers = { wrapper };
                AsyncTask<Wrapper, String, String> writeDB = new AccessWebTask().execute(wrappers);

            }
            catch (Exception e) {
                Log.v(TAG, e.toString());
            }
        }
    }

    protected JSONObject makeDaily(){
        JSONObject mhtrackers = new JSONObject();
        JSONObject daily = new JSONObject();
        //https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html
        //https://www.w3schools.com/java/java_date.asp
        LocalDateTime time = LocalDateTime.now();

        try {
            daily.put("userID", this.userID);
            daily.put("date", time.toString());

            if (!Objects.isNull(this.energy)){
                mhtrackers.put("energy", Integer.parseInt(this.energy));
            }
            if (!Objects.isNull(this.depression)){
                mhtrackers.put("depression", Integer.parseInt(this.depression));
            }
            if (!Objects.isNull(this.anxiety)){
                mhtrackers.put("anxiety", Integer.parseInt(this.anxiety));
            }
            if (!Objects.isNull(this.stress)){
                mhtrackers.put("stress", Integer.parseInt(this.stress));
            }
            if (!Objects.isNull(this.motivation)){
                mhtrackers.put("motivation", Integer.parseInt(this.motivation));
            }

            daily.put("trackers", mhtrackers);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return daily;
    }

    public void onclickReturnMain(View view) {
        Intent i = new Intent();
        setResult(RESULT_OK, i);
        finish();
    }

    public void onclickClearAll(View view) {
        actualClear();
    }

    public void actualClear(){
        TextView energyView = findViewById(R.id.energyField);
        energyView.setText(formatEnergy(null));
        this.energy = null;

        TextView depressionView = findViewById(R.id.depressionField);
        depressionView.setText(formatDepression(null));
        this.depression = null;

        TextView anxietyView = findViewById(R.id.anxietyField);
        anxietyView.setText(formatAnxiety(null));
        this.anxiety = null;

        TextView stressView = findViewById(R.id.stressField);
        stressView.setText(formatStress(null));
        this.stress = null;

        TextView motivationView = findViewById(R.id.motivationField);
        motivationView.setText(formatMotivation(null));
        this.motivation = null;
    }

    public String formatEnergy(String num){
        String toRet = "                              Energy";
        if (Objects.isNull(num)){
            return toRet;
        }
        else {
            return toRet + ": " + num;
        }
    }

    public String formatDepression(String num){
        String toRet = "                          Depression";
        if (Objects.isNull(num)){
            return toRet;
        }
        else {
            return toRet + ": " + num;
        }
    }

    public String formatAnxiety(String num){
        String toRet = "                              Anxiety";
        if (Objects.isNull(num)){
            return toRet;
        }
        else {
            return toRet + ": " + num;
        }
    }

    public String formatStress(String num){
        String toRet = "                              Stress";
        if (Objects.isNull(num)){
            return toRet;
        }
        else {
            return toRet + ": " + num;
        }
    }

    public String formatMotivation(String num){
        String toRet = "                           Motivation";
        if (Objects.isNull(num)){
            return toRet;
        }
        else {
            return toRet + ": " + num;
        }
    }

    public void setEnergy(String num){
        TextView energyView = findViewById(R.id.energyField);
        energyView.setText(formatEnergy(num));
        this.energy = num;
    }

    public void energyButton1(View view) {
        setEnergy("1");
    }

    public void energyButton2(View view) {
        setEnergy("2");
    }

    public void energyButton3(View view) {
        setEnergy("3");
    }

    public void energyButton4(View view) {
        setEnergy("4");
    }

    public void energyButton5(View view) {
        setEnergy("5");
    }

    public void energyButton6(View view) {
        setEnergy("6");
    }

    public void energyButton7(View view) {
        setEnergy("7");
    }

    public void energyButton8(View view) {
        setEnergy("8");
    }

    public void energyButton9(View view) {
        setEnergy("9");
    }

    public void energyButton10(View view) {
        setEnergy("10");
    }


    public void setDepression(String num){
        TextView depView = findViewById(R.id.depressionField);
        depView.setText(formatDepression(num));
        this.depression = num;
    }

    public void depButton1(View view) {
        setDepression("1");
    }

    public void depButton2(View view) {
        setDepression("2");
    }

    public void depButton3(View view) {
        setDepression("3");
    }

    public void depButton4(View view) {
        setDepression("4");
    }

    public void depButton5(View view) {
        setDepression("5");
    }

    public void depButton6(View view) {
        setDepression("6");
    }

    public void depButton7(View view) {
        setDepression("7");
    }

    public void depButton8(View view) {
        setDepression("8");
    }

    public void depButton9(View view) {
        setDepression("9");
    }

    public void depButton10(View view) {
        setDepression("10");

    }


    public void setAnxiety(String num){
        TextView anxietyView = findViewById(R.id.anxietyField);
        anxietyView.setText(formatAnxiety(num));
        this.anxiety = num;
    }

    public void anxButton1(View view) {
        setAnxiety("1");
    }

    public void anxButton2(View view) {
        setAnxiety("2");
    }

    public void anxButton3(View view) {
        setAnxiety("3");
    }

    public void anxButton4(View view) {
        setAnxiety("4");
    }

    public void anxButton5(View view) {
        setAnxiety("5");
    }

    public void anxButton6(View view) {
        setAnxiety("6");
    }

    public void anxButton7(View view) {
        setAnxiety("7");
    }

    public void anxButton8(View view) {
        setAnxiety("8");
    }

    public void anxButton9(View view) {
        setAnxiety("9");
    }

    public void anxButton10(View view) {
        setAnxiety("10");
    }


    public void setStress(String num){
        TextView stressView = findViewById(R.id.stressField);
        stressView.setText(formatStress(num));
        this.stress = num;
    }

    public void stressButton1(View view) {
        setStress("1");
    }

    public void stressButton2(View view) {
        setStress("2");
    }

    public void stressButton3(View view) {
        setStress("3");
    }

    public void stressButton4(View view) {
        setStress("4");
    }

    public void stressButton5(View view) {
        setStress("5");
    }

    public void stressButton6(View view) {
        setStress("6");
    }

    public void stressButton7(View view) {
        setStress("7");
    }

    public void stressButton8(View view) {
        setStress("8");
    }

    public void stressButton9(View view) {
        setStress("9");
    }

    public void stressButton10(View view) {
        setStress("10");
    }


    public void setMotivation(String num){
        TextView motivationView = findViewById(R.id.motivationField);
        motivationView.setText(formatMotivation(num));
        this.motivation = num;
    }

    public void motButton1(View view) {
        setMotivation("1");
    }

    public void motButton2(View view) {
        setMotivation("2");
    }

    public void motButton3(View view) {
        setMotivation("3");
    }

    public void motButton4(View view) {
        setMotivation("4");
    }

    public void motButton5(View view) {
        setMotivation("5");
    }

    public void motButton6(View view) {
        setMotivation("6");
    }

    public void motButton7(View view) {
        setMotivation("7");
    }

    public void motButton8(View view) {
        setMotivation("8");
    }

    public void motButton9(View view) {
        setMotivation("9");
    }

    public void motButton10(View view) {
        setMotivation("10");
    }

    //https://developer.android.com/reference/android/os/AsyncTask
    private class AccessWebTask extends AsyncTask<Wrapper, String, String> {

        @Override
        protected String doInBackground(Wrapper... wrappers) {
            try {
                Wrapper w = wrappers[0];

                //represents the connection to the URL
                URL url = w.getUrl();
                JSONObject entry = w.getEntry();
                String which = w.getWhich();

                //represents the connection to the URL
                Log.v(TAG, url.toString());

                HttpURLConnection conn = (HttpURLConnection)url.openConnection();

                conn.setRequestProperty("Content-Type", "application/json;charset=utf-8");
                conn.setRequestProperty("Accept", "application/json");
                conn.setDoInput(true);
                conn.setDoOutput(true);
                conn.setRequestMethod("POST");


                // this is the JSON that you want to send
                // note that you need double-quotes around strings
                // and need to escape those double-quotes with the backslash character
                //String json = "{\"username\":\"root\",\"password\":\"password\"}";
                String json = entry.toString();

                Log.v(TAG, json);

                byte[] bytes = json.getBytes(StandardCharsets.UTF_8);

                try(OutputStream os = conn.getOutputStream()) {
                    os.write(bytes, 0, bytes.length);
                    Log.v(TAG, "Enter Here?");
                }

                conn.connect();

                // now the response comes back
                int responsecode = conn.getResponseCode();

                // make sure the response has "200 OK" as the status
                if (responsecode != 200) {
                    String errorCode = "Problem writing to the Database: " + responsecode;
                    System.out.println(errorCode);
                    return errorCode;
                }
                else {

                    try(BufferedReader br = new BufferedReader(
                            new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                        StringBuilder response = new StringBuilder();
                        String responseLine = null;
                        while ((responseLine = br.readLine()) != null) {
                            response.append(responseLine.trim());
                        }
                        System.out.println(response.toString());
                        return response.toString();
                    }
                }
            }
            catch (Exception e) {
                e.printStackTrace();
                return e.toString();
            }

        }

        @Override
        protected void onPostExecute(String s) {
            // this method would be called in the UI thread after doInBackground finishes
            // it can access the Views and update them asynchronously
            //https://stackoverflow.com/questions/1816458/getting-hold-of-the-outer-class-object-from-the-inner-class-object
            TrackMHActivity.this.updateUI();
        }

    }

    protected void updateUI(){
        actualClear();
        resetMHTrackers();
    }

    protected void resetMHTrackers(){
        this.energy = null;
        this.depression = null;
        this.anxiety = null;
        this.stress = null;
        this.motivation = null;
    }


}