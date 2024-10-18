import pandas as pd

def process_data(input_file, output_file):
    try:
        # Read the CSV file ignoring metadata lines (the first 8 lines) and specifying the encoding
        df = pd.read_csv(input_file, skiprows=8, delimiter=';', encoding='ISO-8859-1')
        
        # Selecting the columns of interest
        selected_columns = [
            'Data',
            'PRECIPITACAO TOTAL, HORARIO (mm)', 
            'PRESSAO ATMOSFERICA AO NIVEL DA ESTACAO, HORARIA (mB)',
            'RADIACAO GLOBAL (KJ/m2)', 
            'TEMPERATURA DO AR - BULBO SECO, HORARIA (0C)', 
            'UMIDADE RELATIVA DO AR, HORARIA (%)', 
            'VENTO, RAJADA MAXIMA (m/s)'
        ]
        
        # Extracting latitude and longitude from the metadata in lines 5 and 6
        with open(input_file, 'r', encoding='ISO-8859-1') as f:
            lines = f.readlines()
            latitude = lines[4].split(';')[1].strip()
            longitude = lines[5].split(';')[1].strip()

        # Filtering only the desired columns
        filtered_df = df[selected_columns].copy()

        # Converting the 'Data' column to date format
        filtered_df['Data'] = pd.to_datetime(filtered_df['Data'], format='%Y/%m/%d')

        # Converting numeric columns from object type to float, handling non-numeric values
        numeric_columns = [
            'PRECIPITACAO TOTAL, HORARIO (mm)', 
            'PRESSAO ATMOSFERICA AO NIVEL DA ESTACAO, HORARIA (mB)', 
            'RADIACAO GLOBAL (KJ/m2)', 
            'TEMPERATURA DO AR - BULBO SECO, HORARIA (0C)', 
            'UMIDADE RELATIVA DO AR, HORARIA (%)', 
            'VENTO, RAJADA MAXIMA (m/s)'
        ]

        # Applying conversion from strings to floats only if the column is of object type
        for column in numeric_columns:
            if filtered_df[column].dtype == 'object':
                filtered_df[column] = filtered_df[column].str.replace(',', '.').astype(float)
        
        # Grouping by 'Data' and calculating the mean for all columns except 'PRECIPITACAO TOTAL, HORARIO (mm)'
        daily_means = filtered_df.groupby('Data').mean()

        # Rounding the means to 2 decimal places
        daily_means = daily_means.round(2)

        # Calculating the sum of daily precipitation
        daily_means['PRECIPITACAO TOTAL, HORARIO (mm)'] = filtered_df.groupby('Data')['PRECIPITACAO TOTAL, HORARIO (mm)'].sum()

        # Adding latitude and longitude at the beginning of the DataFrame
        daily_means.insert(0, 'latitude', latitude)
        daily_means.insert(1, 'longitude', longitude)

        # Saving the CSV file with daily data
        daily_means.to_csv(output_file, index=True)
        print(f"Médias diárias calculadas, arredondadas e salvas em {output_file}.")
        
    except FileNotFoundError:
        print("Arquivo não encontrado. Verifique o caminho do arquivo.")
    except KeyError as e:
        print(f"Coluna não encontrada: {e}")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")


input_file = 'INMET_SE_SP_BAURU_2024_original.csv' # Replace with the path to the original CSV file
output_file = 'INMET_SE_SP_BAURU_2024.csv' # Name of the new CSV file
process_data(input_file, output_file)