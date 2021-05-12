package edu.brynmawr.cmsc353.journal;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

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

public class CreateAccActivity extends AppCompatActivity {

    private static final String TAG = "CreateAccActivity";
    private EditText nameEditText = null;
    private EditText emailEditText = null;
    private EditText passwordEditText = null;
    private Button errorMsg = null;
    private String enteredName = null;
    private String enteredEmail = null;
    private String enteredPwd = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_acc);

        nameEditText = findViewById(R.id.editTxtName);
        emailEditText = findViewById(R.id.editTxtEmail);
        passwordEditText = findViewById(R.id.editTxtPwd);
        errorMsg = findViewById(R.id.errorCreateAcc);

        if (errorMsg.getVisibility() == View.VISIBLE){
            errorMsg.setVisibility(View.INVISIBLE);
        }
    }

    public void onClickCreateAcc(View view) {
        if (errorMsg.getVisibility() == View.VISIBLE){
            errorMsg.setVisibility(View.INVISIBLE);
        }

        enteredName = nameEditText.getText().toString();
        enteredEmail = emailEditText.getText().toString();
        enteredPwd = passwordEditText.getText().toString();
        Log.v(TAG, "enteredName: " + enteredName);
        Log.v(TAG, "enteredEmail: " + enteredEmail);
        Log.v(TAG, "enteredPassword: " + enteredPwd);

        if (Objects.isNull(enteredEmail) || Objects.isNull(enteredPwd) ||
                Objects.isNull(enteredName) || enteredEmail.isEmpty() == true ||
                enteredPwd.isEmpty() == true || enteredName.isEmpty() == true){
            showError("name, email, and password fields are all required");
        }
        else {
            try {
                URL url = new URL("http://10.0.2.2:3000/createUser");

                URL[] urls = { url };

                AsyncTask<URL, String, String> writeDB = new CreateAccActivity.CreateUser().execute(urls);

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

    public void onClickReturnLogin(View view) {
        clearAll();
        Intent i = new Intent();
        setResult(RESULT_OK);
        finish();
    }

    private class CreateUser extends AsyncTask<URL, String, String> {

        @Override
        protected String doInBackground(URL... urls) {
            try {
                URL url = urls[0];

                JSONObject newUser = new JSONObject();
                newUser.put("name", CreateAccActivity.this.enteredName);
                newUser.put("email", CreateAccActivity.this.enteredEmail);
                newUser.put("password", CreateAccActivity.this.enteredPwd);

                Log.v(TAG, url.toString());

                HttpURLConnection conn = (HttpURLConnection)url.openConnection();

                conn.setRequestProperty("Content-Type", "application/json;charset=utf-8");
                conn.setRequestProperty("Accept", "application/json");
                conn.setDoInput(true);
                conn.setDoOutput(true);
                conn.setRequestMethod("POST");

                String json = newUser.toString();

                Log.v(TAG, json);

                byte[] bytes = json.getBytes(StandardCharsets.UTF_8);

                try(OutputStream os = conn.getOutputStream()) {
                    os.write(bytes, 0, bytes.length);
                }

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
                        System.out.println(response.toString());

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
                CreateAccActivity.this.showError("connection failure, please try again later");
                CreateAccActivity.this.clearAll();
            }
            try {
                JSONObject obj = new JSONObject(s);
                if (obj.has("error")){
                    String error = String.valueOf(obj.get("error"));
                    if (error.equals("FailureToAddUser")){
                        CreateAccActivity.this.showError("failure to add user to the database");
                    }
                    else if(error.equals("emailAlreadyExists")){
                        CreateAccActivity.this.showError("email already exists in the database");
                    }
                    else {

                    }
                    CreateAccActivity.this.clearAll();
                }
                else {//"success", successfully added newUser to database
                    String id = String.valueOf(obj.get("id"));

                    Log.v(TAG, "user id" + id);

                    CreateAccActivity.this.clearAll();

                    Intent i = new Intent(CreateAccActivity.this, MainActivity.class);
                    i.putExtra("id", id);
                    startActivity(i);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

    }

    protected void clearVars(){
        enteredName = null;
        enteredEmail = null;
        enteredPwd = null;
    }

    protected void clearEditTexts(){
        nameEditText.setText("");
        emailEditText.setText("");
        passwordEditText.setText("");
    }

    protected void clearAll(){
        clearEditTexts();
        clearVars();
    }

}