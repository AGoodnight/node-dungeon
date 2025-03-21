# This script searches a list of columns for all values and removes duplicates 
# then creates csv files that can be imported into individual tables to ...
# establish a relationship with the primary table

filepath=$(realpath "$1")
output_directory=$(dirname "$filepath")
columns_with_values=(Name Align)
columns_to_isolate=(Size Type)
columns_with_lists=(Languages Skills Additional Font Senses WRI Speeds)
columns_with_lists_iter="${columns_with_lists[@]}"
columns_with_values_iter="${columns_with_values[@]}"
columns_to_isolate_iter="${columns_to_isolate[@]}"
# Todo: Refactor
# Create CSV's of columns with multiple values, these will become their own tables
for N in $columns_with_lists_iter
do 
    csvcut -c ${N} $1 | 
    tail -n +2| 
    awk '{print tolower($0)}'| # lowercase
    tr '\n' ',' | tr -d "[:digit:]\"" | # convert newlines to commas | remove digits and quotes
    awk "{ gsub(/(^|[^a-zA-Z])'([^a-zA-Z]|$)/, \"\"); gsub(/ *,+ */, \",\") }1" | # remove spaces before striping duplicates
    awk 'BEGIN{RS=ORS=","} !seen[$0]++' | # strip duplicates
    awk '{ gsub(/,+/,",") ; sub(/,$/, "") ; sub(/^,/, "") }1' | # normalizing comma sequences while removing any trailing and leading commas
    tr -d '\n' | tr ',' '\n' > $output_directory/${N}.txt # remove new lines and print to file
done;

for N in $columns_to_isolate_iter
do
 csvcut -c ${N} $1 | 
    tail -n +2| 
    awk '{print tolower($0)}'| # lowercase
    tr '\n' ',' | tr -d "[:digit:]\"" | # convert newlines to commas | remove digits and quotes
    awk "{ gsub(/(^|[^a-zA-Z])'([^a-zA-Z]|$)/, \"\"); gsub(/ *,+ */, \",\") }1" | # remove spaces before striping duplicates
    awk 'BEGIN{RS=ORS=","} !seen[$0]++' | # strip duplicates
    awk '{ gsub(/,+/,",") ; sub(/,$/, "") ; sub(/^,/, "") }1' | # normalizing comma sequences while removing any trailing and leading commas
    tr -d '\n' > $output_directory/${N}.txt # remove new lines and print to file
done;

for N in $columns_with_lists_iter
do 
    in2csv -f csv -d ',' $output_directory/${N}.txt | csvformat -U 1 > $output_directory/csv/${N}.csv
    rm -f $output_directory/${N}.txt
done;

# Create the creature table
cl=""
for n in $columns_with_values_iter; do
  cl+="$n,"
done;
cl=${cl%,}

csvcut -c "${cl}" $1 > $output_directory/csv/Stats.csv


