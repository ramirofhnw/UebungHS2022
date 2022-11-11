import uvicorn
from fastapi import FastAPI

app = FastAPI()

#Ortschaftsname;PLZ;Zusatzziffer;Gemeindename;BFS-Nr;Kantonskürzel;E;N;Sprache

d = {}
file = open("PLZO_CSV_LV95.csv", encoding="utf-8")
next(file)
for line in file:
        daten = line.strip().split(";")
        ort = daten[0]
        zip = daten[1]
        gemeinde = daten[3]
        kanton = daten[5]
        d[ort] = {"Ort": ort, "PLZ": zip, "Gemeinde": gemeinde, "Kanton":kanton}

file.close()

@app.get("/ort")
async def ort(ort:str):
    if ort in d:
        return d[ort]

    return {"ERROR": "PLZ NOT FOUND"}

uvicorn.run(app, host="127.0.0.1", port=8000)