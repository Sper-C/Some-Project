from bs4 import BeautifulSoup
import pandas as pd
import numpy as np

EXCLUSIVE = [
    'ADD00002 - Nhập môn đầu khóa',
    'BAA00021 - Thể dục 1',
    'BAA00022 - Thể dục 2',
    'BAA00011 - Anh văn 1',
    'BAA00012 - Anh văn 2',
    'BAA00013 - Anh văn 3',
    'BAA00014 - Anh văn 4',
    'BAA00030 - Giáo dục quốc phòng - An ninh',
    'BAA00100 - Đạt chuẩn trình độ ngoại ngữ tốt nghiệp đại học',
]
# Read HTML file
with open("kq.html") as html:
    docs = html.read()

# Create soup from raw html
soup = BeautifulSoup(docs, 'html.parser')
# Find table with id='tbDiemThiGK'
table = soup.find(id='tbDiemThiGK')
# Header: Find tag thead
header_raw = table.find('thead')
# Header content is in aria-label attribute
header = [th.get('aria-label').split(':')[0] for th in header_raw.find_all('th')]
# Select useful information
header = header[:6]
# Body tag
body_raw = table.find('tbody')
# Find all row in table
tr_body_raw = body_raw.find_all('tr')
# Each row forms a record and extract useful information each record
body = [[td.get_text().strip() for td in tr.find_all('td')][:6] for tr in tr_body_raw]
# Create dataframe with header and record
scores = pd.DataFrame(body, columns=header)
# Treat unknown field ('') as NaN and convert some columns into appropriate data type
scores = scores.replace('', np.nan).astype({"Số TC": float,
                                            "Điểm": float})
# Drop subject we don't calculate
drop_row_index = scores[scores['Môn Học'].isin(EXCLUSIVE)].index
scores = scores.drop(drop_row_index, axis=0)
# Select the scores after improvement learning
scores = scores.sort_values(['Mã LĐ']).drop_duplicates('Môn Học', keep='first')
scores['Credit x Scores'] = scores['Số TC'] * scores['Điểm']
# Drop subjects which aren't given a score
scores = scores.dropna(subset='Điểm').reset_index()
# Calculate total credit and GPA
total_credits = int(scores['Số TC'].sum())
GPA = scores['Credit x Scores'].sum()/total_credits
print(f'Total number of credits is {total_credits}')
print(f'GPA is {GPA}')


