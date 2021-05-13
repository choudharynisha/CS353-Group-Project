package edu.brynmawr.cmsc353.journal.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import edu.brynmawr.cmsc353.journal.R;

public class GoalsAdapter extends RecyclerView.Adapter<GoalsAdapter.ViewHolder> {

    private List<String> goalTypes;
    private List<String> goalDescriptions;

    public GoalsAdapter(List<String> types, List<String> descriptions) {
        goalTypes = types;
        goalDescriptions = descriptions;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int viewType) {
        View view = LayoutInflater.from(viewGroup.getContext())
                .inflate(R.layout.dashboard_goals_item, viewGroup, false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.goalTypeView.setText(goalTypes.get(position));
        holder.goalDescriptionView.setText(goalDescriptions.get(position));
    }

    @Override
    public int getItemCount() {
        if (goalDescriptions != null)
            return goalDescriptions.size();
        else
            return 0;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView goalTypeView;
        private final TextView goalDescriptionView;

        public ViewHolder(View view) {
            super(view);

            goalTypeView = (TextView) view.findViewById(R.id.txtGoalType);
            goalDescriptionView = (TextView) view.findViewById(R.id.txtGoalDescription);
        }
    }
}
