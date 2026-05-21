export default function RoutineForm() {
  return (
    <form>
      <label>Nombre: </label>
      <input type="text" />

      <label>Descripcion: </label>
      <input type="text" />

      <label>Tipo: </label>
      <select>
        <option disabled defaultChecked>
          --Seleccione--
        </option>
        <option>Estandar</option>
        <option>Personalizada</option>
      </select>

      <label>Objetivo: </label>
      <select>
        <option disabled defaultChecked>
          --Seleccione--
        </option>
        <option>Ganancia muscular</option>
        <option>Decenso de grasa</option>
        <option>Fuerza</option>
        <option>Acondicionamiento general</option>
      </select>

      <label>Frecuencia por semana</label>
      <input type="number" />

      <button>Agregar ejercicio</button>
    </form>
  );
}
