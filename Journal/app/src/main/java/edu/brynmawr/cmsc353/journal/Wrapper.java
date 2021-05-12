package edu.brynmawr.cmsc353.journal;

import org.json.JSONObject;

import java.net.URL;

public class Wrapper {

    private URL url = null;
    private JSONObject entry = null;
    private String which = null;

    //https://stackoverflow.com/questions/12069669/how-can-you-pass-multiple-primitive-parameters-to-asynctask
    public Wrapper(URL url, JSONObject entry, String which){
        this.url = url;
        this.entry = entry;
        this.which = which;
    }

    public URL getUrl() {
        return this.url;
    }

    public JSONObject getEntry() {
        return this.entry;
    }

    public String getWhich(){
        return this.which;
    }
}
