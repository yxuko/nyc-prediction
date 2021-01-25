from flask import Flask, request, jsonify
from tensorflow import keras
from flask_cors import CORS

model = keras.models.load_model("model")

app = Flask(__name__)
CORS(app, resources=r"/predict/*")


@app.route("/predict", methods=["GET", "POST"])
def index():
    data = {}

    if request.method == "POST":
        print(request.json)

        latitude = request.json["latitude"]
        longitude = request.json["longitude"]
        boro_nm = request.json["boro"]
        vic_sex = request.json["sex"]
        vic_race = request.json["race"]
        cmplnt_fr_year = int(request.json["year"])
        cmplnt_fr_month = request.json["month"]
        cmplnt_fr_day = request.json["day"]
        cmplnt_fr_hour = request.json["hour"]
        # loc_of_occur_desc = request.json["LOC_OF_OCCUR_DESC"]
        # prem_typ_desc = request.json["PREM_TYP_DESC"]

        boro_nm_bronx = 0
        boro_nm_brooklyn = 0
        boro_nm_manhattan = 0
        boro_nm_queens = 0
        boro_nm_staten_island = 0
        vic_sex_f = 0
        vic_sex_m = 0
        vic_race_american_india = 0
        vic_race_asian = 0
        vic_race_black = 0
        vic_race_black_hispanic = 0
        vic_race_other = 0
        vic_race_white = 0
        vic_race_white_hispanic = 0

        if boro_nm == "BRONX":
            boro_nm_bronx = 1
        elif boro_nm == "BROOKLYN":
            boro_nm_brooklyn = 1
        elif boro_nm == "MANHATTAN":
            boro_nm_manhattan = 1
        elif boro_nm == "QUEENS":
            boro_nm_queens = 1
        elif boro_nm == "STATEN ISLAND":
            boro_nm_staten_island = 1

        if vic_sex == "F":
            vic_sex_f = 1
        elif vic_sex == "M":
            vic_sex_m = 1

        if vic_race == "BLACK":
            vic_race_black = 1
        elif vic_race == "BLACK HISPANIC":
            vic_race_black_hispanic = 1
        elif vic_race == "ASIAN / PACIFIC ISLANDER":
            vic_race_asian = 1
        elif vic_race == "AMERICAN INDIAN/ALASKAN NATIVE":
            vic_race_american_india = 1
        elif vic_race == "WHITE":
            vic_race_white = 1
        elif vic_race == "WHITE HISPANIC":
            vic_race_white_hispanic = 1
        elif vic_race == "OTHER":
            vic_race_other = 1

        ky_cd = model.predict(
            [
                [
                    latitude,
                    longitude,
                    cmplnt_fr_year,
                    cmplnt_fr_month,
                    cmplnt_fr_day,
                    cmplnt_fr_hour,
                    boro_nm_bronx,
                    boro_nm_brooklyn,
                    boro_nm_manhattan,
                    boro_nm_queens,
                    boro_nm_staten_island,
                    vic_sex_f,
                    vic_sex_m,
                    vic_race_american_india,
                    vic_race_asian,
                    vic_race_black,
                    vic_race_black_hispanic,
                    vic_race_other,
                    vic_race_white,
                    vic_race_white_hispanic
                ]
            ]
        )
        data["HOMICIDE"] = format(ky_cd[0][0] * 100, '.2f')
        data["SEXCRIME"] = format(ky_cd[0][1] * 100, '.2f')
        data["THEFTFRAUD"] = format(ky_cd[0][2] * 100, '.2f')
        data["OTHERVIOLENT"] = format(ky_cd[0][3] * 100, '.2f')
        data["DRUGS"] = format(ky_cd[0][4] * 100, '.2f')
        data["OTHER"] = format(ky_cd[0][5] * 100, '.2f')

    return jsonify(data)


if __name__ == "__main__":
    app.run("127.0.0.1", port=5000, debug=False)
