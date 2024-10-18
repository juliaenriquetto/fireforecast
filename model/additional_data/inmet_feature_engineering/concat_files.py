import pandas as pd
import glob # load all files at once

# path where the CSVs are stored
path = '2024/*.csv'

# load all CSV files from the folder
arquivos_csv = glob.glob(path)

# read and concatenate the dataframes
df_list = [pd.read_csv(arquivo) for arquivo in arquivos_csv]
df_completo = pd.concat(df_list, ignore_index=True)

# save the concatenated dataframe to a new CSV file
df_completo.to_csv('2024/df_2024.csv', index=False)

# display the first rows of the concatenated dataframe
print("Dados concatenados salvos com sucesso!")