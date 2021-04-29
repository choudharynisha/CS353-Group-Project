package edu.brynmawr.cmsc353.journal;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import java.util.Objects;

public class SetGoalActivity extends AppCompatActivity {

    private String userID = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_set_goal);

        if (Objects.isNull(this.userID)){
            this.userID = getIntent().getStringExtra("userID");
        }
    }
    //EditText
    //https://stackoverflow.com/questions/21777590/how-to-create-multiline-edittext-with-scroll-view-within-activity
    //https://www.youtube.com/watch?v=V0AETAjxqLI

    public void onclickSubmit(View view) {
    }

    public void onclickClearAll(View view) {
    }

    public void onclickReturnMain(View view) {
        Intent i = new Intent();
        setResult(RESULT_OK, i);
        finish();
    }


    public void onClickDailyButton(View view) {
    }

    public void onclickWeeklyButton(View view) {
    }

    public void onclickMonthlyButton(View view) {
    }
}