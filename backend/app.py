from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuración de MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/cadena_hotelera"
mongo = PyMongo(app)

@app.route('/sede', methods=['GET'])
def get_sedes():
    try:
        # Cambiar la colección a 'sede'
        data = mongo.db.sede.find()
        result = []
        for item in data:
            item['_id'] = str(item['_id'])  # Convertir ObjectId a string
            result.append(item)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/disponibilidad', methods=['GET'])
def consultar_disponibilidad():
    try:
        fecha_inicio = request.args.get('fecha_inicio')
        fecha_fin = request.args.get('fecha_fin')
        sede = request.args.get('sede')

        if not fecha_inicio or not fecha_fin or not sede:
            return jsonify({"error": "Parámetros faltantes"}), 400

        # Cambiar la colección a 'sede' y hacer la búsqueda insensible a mayúsculas
        data = mongo.db.sede.find_one({"nombre": {"$regex": f"^{sede}$", "$options": "i"}})
        if not data:
            return jsonify({"error": "Sede no encontrada"}), 404

        result = []
        for habitacion in data['habitaciones']:
            fechas_disponibles = habitacion['fecha_disponible']
            if all(fecha in fechas_disponibles for fecha in [fecha_inicio, fecha_fin]):
                result.append({
                    "tipo": habitacion['tipo'],
                    "cantidad": habitacion['cantidad'],
                    "cupo_max": habitacion['cupo_max']
                })

        if not result:
            return jsonify({"message": "No hay habitaciones disponibles"}), 404

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/calcular-tarifa', methods=['POST'])
def calcular_tarifa():
    try:
        data = request.json
        sede = data.get('sede')
        tipo_habitacion = data.get('tipo_habitacion')
        temporada = data.get('temporada')
        numero_personas = data.get('numero_personas')
        numero_habitaciones = data.get('numero_habitaciones')

        if not all([sede, tipo_habitacion, temporada, numero_personas, numero_habitaciones]):
            return jsonify({"error": "Parámetros faltantes"}), 400

        # Cambiar la colección a 'sede' y hacer la búsqueda insensible a mayúsculas
        sede_data = mongo.db.sede.find_one({"nombre": {"$regex": f"^{sede}$", "$options": "i"}})
        if not sede_data:
            return jsonify({"error": "Sede no encontrada"}), 404

        # Obtener la tarifa y convertirla a número
        tarifa = sede_data['tarifas'][temporada][tipo_habitacion]
        numero_habitaciones = int(numero_habitaciones)  # Asegurarse de que sea un entero
        total = tarifa * numero_habitaciones

        return jsonify({"tarifa_total": total}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)