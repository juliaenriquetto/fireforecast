import pandas as pd

def process_data(input_file, output_file):
    try:
        # Lê o arquivo CSV ignorando as linhas de metadados (as primeiras 8 linhas) e especifica a codificação
        df = pd.read_csv(input_file, skiprows=8, delimiter=';', encoding='ISO-8859-1')
        
        # Selecionando as colunas de interesse
        selected_columns = [
            'Data', # não precisa mudar
            'PRECIPITACAO TOTAL, HORARIO (mm)', 
            'PRESSAO ATMOSFERICA AO NIVEL DA ESTACAO, HORARIA (mB)', # não precisa mudar
            'RADIACAO GLOBAL (KJ/m2)', 
            'TEMPERATURA DO AR - BULBO SECO, HORARIA (0C)', 
            'UMIDADE RELATIVA DO AR, HORARIA (%)', # não precisa mudar
            'VENTO, RAJADA MAXIMA (m/s)' # não precisa mudar
        ]
        
        # Extraindo latitude e longitude dos metadados nas linhas 5 e 6
        with open(input_file, 'r', encoding='ISO-8859-1') as f:
            lines = f.readlines()
            latitude = lines[4].split(';')[1].strip()
            longitude = lines[5].split(';')[1].strip()

        # Filtrando apenas as colunas desejadas
        filtered_df = df[selected_columns].copy()

        # Convertendo a coluna 'Data' para o formato de data
        filtered_df['Data'] = pd.to_datetime(filtered_df['Data'], format='%Y/%m/%d')

        # Convertendo colunas numéricas de tipo object para float, tratando valores não numéricos
        numeric_columns = [
            'PRECIPITACAO TOTAL, HORARIO (mm)', 
            'PRESSAO ATMOSFERICA AO NIVEL DA ESTACAO, HORARIA (mB)', 
            'RADIACAO GLOBAL (KJ/m2)', 
            'TEMPERATURA DO AR - BULBO SECO, HORARIA (0C)', 
            'UMIDADE RELATIVA DO AR, HORARIA (%)', 
            'VENTO, RAJADA MAXIMA (m/s)'
        ]

        # Aplicando a conversão de strings para floats apenas se a coluna for do tipo object
        for column in numeric_columns:
            if filtered_df[column].dtype == 'object':
                filtered_df[column] = filtered_df[column].str.replace(',', '.').astype(float)
        
        # Agrupando por 'Data' e calculando a média para todas as colunas exceto 'PRECIPITACAO TOTAL, HORARIO (mm)'
        daily_means = filtered_df.groupby('Data').mean()

        # Arredondando as médias para 2 casas decimais
        daily_means = daily_means.round(2)

        # Calculando a soma da precipitação diária
        daily_means['PRECIPITACAO TOTAL, HORARIO (mm)'] = filtered_df.groupby('Data')['PRECIPITACAO TOTAL, HORARIO (mm)'].sum()

        # Adicionando latitude e longitude ao início do DataFrame
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


input_file = 'INMET_SE_SP_BAURU_2023_original.csv'  # Substitua pelo caminho do arquivo CSV original
output_file = 'INMET_SE_SP_BAURU_2023.csv'  # Nome do novo arquivo CSV
process_data(input_file, output_file)
