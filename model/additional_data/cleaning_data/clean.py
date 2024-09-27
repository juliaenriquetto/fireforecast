import pandas as pd

def process_data(input_file, output_file):
    try:
        # Lê o arquivo CSV ignorando as linhas de metadados (as primeiras 8 linhas) e especifica a codificação
        df = pd.read_csv(input_file, skiprows=8, delimiter=';', encoding='ISO-8859-1')
        
        # Selecionando as colunas de interesse
        selected_columns = [
            'Data',
            'PRECIPITACAO TOTAL, HORARIO (mm)', 
            'PRESSAO ATMOSFERICA AO NIVEL DA ESTACAO, HORARIA (mB)', 
            'RADIACAO GLOBAL (KJ/m2)', 
            'TEMPERATURA DO AR - BULBO SECO, HORARIA (0C)', 
            'UMIDADE RELATIVA DO AR, HORARIA (%)', 
            'VENTO, RAJADA MAXIMA (m/s)'
        ]
        
        # Extraindo latitude e longitude dos metadados nas linhas 5 e 6
        with open(input_file, 'r', encoding='ISO-8859-1') as f:
            lines = f.readlines()
            latitude = lines[4].split(';')[1].strip()
            longitude = lines[5].split(';')[1].strip()

        # Adicionando latitude e longitude aos dados
        df['latitude'] = latitude
        df['longitude'] = longitude

        # Filtrando apenas as colunas desejadas
        filtered_df = df[selected_columns].copy()  # Usa .copy() para evitar o erro de cópia

        # Convertendo a coluna 'Data' para o formato de data
        filtered_df.loc[:, 'Data'] = pd.to_datetime(filtered_df['Data'], format='%Y/%m/%d')

        # Convertendo colunas numéricas de tipo object para float, se necessário
        numeric_columns = [
            'PRECIPITACAO TOTAL, HORARIO (mm)', 
            'PRESSAO ATMOSFERICA AO NIVEL DA ESTACAO, HORARIA (mB)', 
            'RADIACAO GLOBAL (KJ/m2)', 
            'TEMPERATURA DO AR - BULBO SECO, HORARIA (0C)', 
            'UMIDADE RELATIVA DO AR, HORARIA (%)', 
            'VENTO, RAJADA MAXIMA (m/s)'
        ]
        
        for column in numeric_columns:
            filtered_df[column] = pd.to_numeric(filtered_df[column], errors='coerce')  # Converte para numérico

        # Agrupando por 'Data' e calculando a média
        daily_means = filtered_df.groupby('Data').mean()

        # Arredondando as médias para 2 casas decimais
        daily_means = daily_means.round(2)

        # Adicionando latitude e longitude ao início do DataFrame, sem repetir no final
        daily_means.insert(0, 'latitude', latitude)
        daily_means.insert(1, 'longitude', longitude)
        
        # Salvando o arquivo CSV com os dados diários
        daily_means.to_csv(output_file, index=True)
        print(f"Médias diárias calculadas, arredondadas e salvas em {output_file}.")
        
    except FileNotFoundError:
        print("Arquivo não encontrado. Verifique o caminho do arquivo.")
    except KeyError as e:
        print(f"Coluna não encontrada: {e}")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

# Exemplo de uso
input_file = 'INMET_CO_DF_BRASILIA_2019.csv'  # caminho do arquivo csv
output_file = 'medias_diarias_Brasilia.csv'   # copia do arquivo CSV, alterado
process_data(input_file, output_file)
