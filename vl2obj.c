#include <stdio.h>
#include <stdlib.h>	// atoi()

#define MAXCHAR 1000
#define MAXFILESIZE 1024 * 100

int endsWith(const char *str, const char *suffix)
{
    if (!str || !suffix)
        return 0;
    size_t lenstr = strlen(str);
    size_t lensuffix = strlen(suffix);
    if (lensuffix >  lenstr)
        return 0;
    return strncmp(str + lenstr - lensuffix, suffix, lensuffix) == 0;
}

struct Point {
	int32_t enm;
	float x;
	float y;
	float z;
	float i;
};

float reverseFloat(const float flt) {
	float retVal;
	char *floatToConvert = ( char* ) & flt;
	char *returnFloat = ( char* ) & retVal;

	// swap the bytes into a temporary buffer
	returnFloat[0] = floatToConvert[3];
	returnFloat[1] = floatToConvert[2];
	returnFloat[2] = floatToConvert[1];
	returnFloat[3] = floatToConvert[0];

	return retVal;
}

int32_t reverseInt(const int32_t i) {
	uint32_t b0,b1,b2,b3;
	
	b0 = (i & 0x000000ff) << 24u;
	b1 = (i & 0x0000ff00) << 8u;
	b2 = (i & 0x00ff0000) >> 8u;
	b3 = (i & 0xff000000) >> 24u;

	return b0 | b1 | b2 | b3;
}

struct Point toLittleEndian(const struct Point p) {
	struct Point r;
	r.enm = reverseInt(p.enm);
	r.x = reverseFloat(p.x);
	r.y = reverseFloat(p.y);
	r.z = reverseFloat(p.z);
	r.i = reverseFloat(p.i);
	
	return r;
}



int main(int argc, char **argv) 
{
	const char* filename;
	FILE *fp;
	size_t sz;
    char str[MAXCHAR];
	char filecontent[MAXFILESIZE];
	char listOrder[MAXFILESIZE];
	struct Point* p;
	struct Point l;
	int vertexIndex = 1;
	int numread = 0;
	int32_t enmCheck = 0;
	int listorderOffset = 0;
	
	if (argc < 2) {
		printf("Usage: vl2obj.exe <filename>\n"
			   "Converts lineobject binary file to obj file\n");
		return 1;
	}
	
	memset(str, 0, MAXCHAR);
	memset(filecontent, 0, MAXFILESIZE);
	memset(listOrder, 0, MAXFILESIZE);
		
	filename = argv[1];
	if (!endsWith(filename, ".vl")) {
		printf("The file must be a .vl file!\n");
		return 1;
	}
	
	printf("Its a vl file!\n");
	
    fp = fopen(filename, "rb");
	
	fseek(fp, 0L, SEEK_END);
	sz = ftell(fp);
	fseek(fp, 0L, SEEK_SET);
	printf("We are at index %d\n", ftell(fp));
	
    if (fp == NULL){
        printf("Could not open file %s\n",filename);
        return 1;
    }
	
	numread = fread(filecontent, 1, sz, fp);
	printf("Read: %d, wanted: %d\n", numread, sz);
	
    fclose(fp);
	
	printf("size of point: %d, int: %d, float: %d\n", sizeof(struct Point), sizeof(int32_t), sizeof(float));
	
	p = (filecontent + sz - sizeof(struct Point));
	
	
	// Find start of line segments, we do not need the meta data at the start of the file
	while(p >= filecontent) {
		enmCheck = reverseInt(p->enm);

		if (enmCheck != 2 && enmCheck != 3) {
			p++; // rewind last step
			break;
		}
		//printf("%s %e %e %e %.2f\n", l.enm == 3 ? "P" : "L", l.x, l.y, l.z, l.i);
		p--;
	}
	
	// replacing .vl with .obj
	char* occurence = strstr(filename, ".vl");
	strncpy(occurence, ".obj\0", 5);
	
	fp = fopen(filename, "w");
	
	fprintf(fp, "g Linesegment\n\n");
	
	while(p < (filecontent + sz)) {
		l = toLittleEndian(*p);
		fprintf(fp, "v %E %E %E\n", l.x, l.y, l.z);
		if (l.enm == 3) {
			strcat(listOrder, "\nl ");
		}
		sprintf(str, "%d ", vertexIndex);
		strcat(listOrder, str);
		vertexIndex++;
		p++;
	}
	
	fprintf(fp, "\n\n%s", listOrder);
	
	//fprintf(fp, "v %e %e %e\n", l.enm == 3 ? "P" : "L", l.x, l.y, l.z);
	fclose(fp);
	
	
	return 0;
}
