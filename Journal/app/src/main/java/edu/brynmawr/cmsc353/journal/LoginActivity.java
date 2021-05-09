package edu.brynmawr.cmsc353.journal;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.Scanner;

public class LoginActivity extends AppCompatActivity {

    private static final String TAG = "LoginActivity";
    private EditText emailEditText = null;
    private EditText passwordEditText = null;
    private Button errorMsg = null;
    private String enteredEmail = null;
    private String enteredPwd = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        emailEditText = findViewById(R.id.editTxtEmail);
        passwordEditText = findViewById(R.id.editTxtPwd);
        errorMsg = findViewById(R.id.errorLogin);

        if (errorMsg.getVisibility() == View.VISIBLE){
            errorMsg.setVisibility(View.INVISIBLE);
        }

    }

    public void onClickLogin(View view) {
        //https://stackoverflow.com/questions/3791607/how-can-i-check-if-a-view-is-visible-or-not-in-android
        if (errorMsg.getVisibility() == View.VISIBLE){
            errorMsg.setVisibility(View.INVISIBLE);
        }

        enteredEmail = emailEditText.getText().toString();
        enteredPwd = passwordEditText.getText().toString();
        Log.v(TAG, "enteredEmail: " + enteredEmail);
        Log.v(TAG, "enteredPassword: " + enteredPwd);

        if (Objects.isNull(enteredEmail) || Objects.isNull(enteredPwd) ||
                enteredEmail.isEmpty() == true || enteredPwd.isEmpty() == true){
            showError("email and password fields both required");
        }
        else {
            try {
                URL url = new URL("http://10.0.2.2:3000/getUser?email=" + enteredEmail);

                URL[] urls = { url };

                AsyncTask<URL, String, String> writeDB = new AccessWebTask().execute(urls);

            } catch (MalformedURLException e) {
                Log.v(TAG, "MalformedURLException");
                e.printStackTrace();
            }
        }
    }

    protected void showError(String toShow){
        errorMsg.setText(toShow);
        errorMsg.setVisibility(View.VISIBLE);
    }

    public void onClickLaunchCreateAcc(View view) {
        Intent i = new Intent(this, CreateAccActivity.class);
        startActivity(i);
    }

    private class AccessWebTask extends AsyncTask<URL, String, String> {

        @Override
        protected String doInBackground(URL... urls) {
            try {
                URL url = urls[0];

                //represents the connection to the URL
                Log.v(TAG, url.toString());

                HttpURLConnection conn = (HttpURLConnection)url.openConnection();

                conn.setRequestMethod("GET");

                conn.connect();

                // now the response comes back
                int responsecode = conn.getResponseCode();

                // make sure the response has "200 OK" as the status
                if (responsecode != 200) {
                    String errorCode = "Problem writing to the Database: " + responsecode;
                    Log.v(TAG, errorCode);
                    return "FailureToConnectToServer";
                }
                else {
                    try(BufferedReader br = new BufferedReader(
                            new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                        StringBuilder response = new StringBuilder();
                        String responseLine = null;
                        while ((responseLine = br.readLine()) != null) {
                            response.append(responseLine.trim());
                        }
                        //Log.v(TAG, response.toString());
                        conn.disconnect();
                        return response.toString();
                    }
                }
            }
            catch(java.net.ConnectException e) {
                e.printStackTrace();
                return "FailureToConnectToServer";
            }
            catch (Exception e) {
                e.printStackTrace();
                return e.toString();
            }

        }

        @Override
        protected void onPostExecute(String s) {
            Log.v(TAG, s);

            if (s.equals("FailureToConnectToServer")){
                LoginActivity.this.showError("connection failure, please try again later");
                LoginActivity.this.clearAll();
            }
            try {
                JSONObject obj = new JSONObject(s);
                if (obj.has("error")){
                    String error = String.valueOf(obj.get("error"));
                    if (error.equals("FailureToReturnUser")){
                        LoginActivity.this.showError("failure to find user in database");
                    }
                    else if(error.equals("EmailNotFound")){
                        LoginActivity.this.showError("email does not exist in the database");
                    }
                    else {

                    }
                    LoginActivity.this.clearAll();
                }
                else {
                    String storedPW = String.valueOf(obj.get("password"));
                    if (storedPW.equals(LoginActivity.this.enteredPwd)){
                        Log.v(TAG, "Passwords match");

                        String id = String.valueOf(obj.get("_id"));
                        Log.v(TAG, "user id" + id);

                        Intent i = new Intent(LoginActivity.this, MainActivity.class);
                        i.putExtra("id", id);
                        startActivity(i);
                    }
                    else {
                        LoginActivity.this.showError("incorrect password");
                        LoginActivity.this.clearAll();
                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }

    }

    protected void clearVars(){
        enteredEmail = null;
        enteredPwd = null;
    }

    protected void clearEditTexts(){
        emailEditText.setText("");
        passwordEditText.setText("");
    }

    protected void clearAll(){
        clearEditTexts();
        clearVars();
    }
}