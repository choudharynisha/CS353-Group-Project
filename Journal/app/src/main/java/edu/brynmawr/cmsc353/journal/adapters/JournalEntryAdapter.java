package edu.brynmawr.cmsc353.journal.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import edu.brynmawr.cmsc353.journal.R;

public class JournalEntryAdapter extends RecyclerView.Adapter<JournalEntryAdapter.ViewHolder> {

    private List<String> journalEntries;
    private List<String> journalDates;

    public JournalEntryAdapter(List<String> dates, List<String> journalData) {
        journalEntries = journalData;
        journalDates = dates;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int viewType) {
        View view = LayoutInflater.from(viewGroup.getContext())
                .inflate(R.layout.weekly_journal_item, viewGroup, false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.entryView.setText(journalEntries.get(position));
        holder.dateView.setText(journalDates.get(position));
    }

    @Override
    public int getItemCount() {
        if (journalEntries != null)
            return journalEntries.size();
        else
            return 0;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView dateView;
        private final TextView entryView;

        public ViewHolder(View view) {
            super(view);

            dateView = (TextView) view.findViewById(R.id.txtDate);
            entryView = (TextView) view.findViewById(R.id.txtJournalContent);
        }

        public TextView getDateView() {
            return dateView;
        }

        public TextView getEntryView() {
            return entryView;
        }
    }
}
