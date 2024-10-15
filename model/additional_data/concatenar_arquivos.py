import pandas as pd
import glob # carregar todos os arquivos de uma vez

# caminho onde estão armazenados os CSVs
path = '2023/*.csv'

# carregar todos os arquivos CSV da pasta
arquivos_csv = glob.glob(path)

# ler e concatenar os dataframes 
df_list = [pd.read_csv(arquivo) for arquivo in arquivos_csv]
df_completo = pd.concat(df_list, ignore_index=True)

# salvar o dataframe concatenado em um novo arquivo CSV
df_completo.to_csv('2023/df_2023.csv', index=False)

# exibir as primeiras linhas do dataframe concatenado
print("Dados concatenados salvos com sucesso!")