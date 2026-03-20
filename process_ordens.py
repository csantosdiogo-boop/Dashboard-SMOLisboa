import pandas as pd

# Constants
CSV_INPUT_FILE = 'total_ordens.csv'
CSV_OUTPUT_FILE = 'processed_ordens.csv'
CONTRACTOR_NAME = 'Litoral Leituras'

# Mapping of work center to municipality
WORK_CENTER_MAP = {
    '8220': 'Municipality 1',
    '8221': 'Municipality 2',  # Example mapping
    # Add other mappings as needed
}

# Read the data
ordens = pd.read_csv(CSV_INPUT_FILE)

# Filter rows where work center starts with '8220'
filtered_ordens = ordens[ordens['work_center'].astype(str).str.startswith('8220')]

# Map municipality and set contractor
filtered_ordens['municipality'] = filtered_ordens['work_center'].str[:4].map(WORK_CENTER_MAP)
filtered_ordens['contractor'] = CONTRACTOR_NAME

# Save the processed data
filtered_ordens.to_csv(CSV_OUTPUT_FILE, index=False)