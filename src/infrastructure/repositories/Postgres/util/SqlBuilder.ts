export class SqlBuilder {
    readonly _WHERE = ' WHERE ';
    readonly _GROUP = ' GROUP BY ';
    readonly _ORDER = ' ORDER BY ';

    sqlInicial: string;
    condiciones: Array<string> = [];
    order: string | undefined;
    group: string | undefined;
    pagination: string | undefined;
    limit: string | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parametros: { [key: string]: any } = {};
    constructor(sqlInicial: string) {
        this.sqlInicial = sqlInicial.trim();
    }

    addLessHigherEquals(
        campo: string,
        valor: string | number | Date | undefined,
        isHigher: boolean,
        paramName?: string,
    ): SqlBuilder {
        if (valor !== undefined) {
            const alias = paramName ? paramName : campo.replace('.', '_');
            this.condiciones.push(campo + (isHigher ? ' >= ' : ' <= ') + '${' + alias + '}');
            this.parametros[alias] = valor;
        }
        return this;
    }

    addEqualsTo(campo: string, valor: string | number | undefined | null): SqlBuilder {
        if (valor) {
            const alias = campo.replace('.', '_');
            this.condiciones.push(campo + ' = ${' + alias + '}');
            this.parametros[alias] = valor;
        }
        return this;
    }

    addLike(campo: string, valor: string | undefined | null): SqlBuilder {
        if (valor) {
            const alias = campo.replace('.', '_');
            this.condiciones.push(campo + ' like ${' + alias + '}');
            this.parametros[alias] = valor + '%';
        }
        return this;
    }

    addBooleanEquals(campo: string, valor: boolean | undefined): SqlBuilder {
        if (valor !== undefined) {
            this.condiciones.push(campo + ' is ${' + campo + '}');
            this.parametros[campo] = /true/i.test(String(valor));
        }
        return this;
    }

    addInValues(campo: string, valores: string[] | number[] | undefined | null): SqlBuilder {
        if (valores) {
            this.condiciones.push(campo + ` in (${valores.join(',')})`);
        }
        return this;
    }

    orderBy(column: string, orientacion: 'ASC' | 'DESC' | string): SqlBuilder {
        this.order = column + ' ' + orientacion;
        return this;
    }

    groupBy(...columnas: string[]): SqlBuilder {
        this.group = `${columnas.join(', ')}`;
        return this;
    }

    withPagination(paginaBusqueda: number, registrosPorPagina: number): SqlBuilder {
        this.pagination = ` LIMIT ${registrosPorPagina} OFFSET ${paginaBusqueda * registrosPorPagina}`;
        return this;
    }

    withLimit(limite: number): SqlBuilder {
        this.limit = ` LIMIT ${limite}`;
        return this;
    }

    construir(): string {
        const sqlWhere = this._crearCondiciones(this.condiciones);
        const sqlGroup = this.group ? this._GROUP + this.group : '';
        const sqlOrder = this.order ? this._ORDER + this.order : '';
        const sqlPagination = this.pagination ? this.pagination : '';
        const sqlLimit = this.limit ? this.limit : '';
        return this.sqlInicial + sqlWhere + sqlGroup + sqlOrder + sqlPagination + sqlLimit;
    }

    _crearCondiciones = (condi: string[]): string => {
        if (this.condiciones.length > 0) {
            return this._WHERE + condi.join(' AND ');
        }
        return '';
    };
}
