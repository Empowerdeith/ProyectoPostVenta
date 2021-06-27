# Generated by Django 3.1.2 on 2021-06-27 15:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orden_devolucion', '0006_auto_20210626_2334'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='boleta',
            name='ItemProductos',
        ),
        migrations.AddField(
            model_name='boleta',
            name='itemProductos',
            field=models.ManyToManyField(blank=True, related_name='itemProductos', to='orden_devolucion.ItemProducto'),
        ),
        migrations.RemoveField(
            model_name='itemproducto',
            name='productos',
        ),
        migrations.AddField(
            model_name='itemproducto',
            name='productos',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='orden_devolucion.producto'),
            preserve_default=False,
        ),
    ]
